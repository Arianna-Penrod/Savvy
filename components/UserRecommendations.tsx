import React, { useCallback, useMemo, useState } from "react";
import { sanitizeBehaviorData } from "@/utils/secureUserRecommendations";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
} from "react-native";

/**
 * UserRecommendations
 * ---------------------------------------------------------------
 * Rule-driven savings recommendations (NOT a machine-learning model).
 *
 * Pipeline:
 *   raw userBehavior
 *     → sanitizeBehaviorData()         (auth + privacy filter)
 *       → safeData
 *         → generateRecommendations()  (deterministic if/then rules)
 *           → ranked Recommendation[]
 *             → filteredRecommendations (category / dismissed / budget cap)
 *               → rendered cards
 *
 * Every recommendation carries a `why` string so the user can see exactly
 * which rule fired
 * ---------------------------------------------------------------
 */

// =================================================================
// Types
// =================================================================

type Category = "Groceries" | "Produce" | "Pantry" | "Household" | "Beauty";

/** Filter pill values include the special "All" option. */
type FilterValue = "All" | Category;

type Recommendation = {
  id: string;
  category: Category;
  title: string;
  message: string;
  /** Label of the primary CTA on the card. */
  action: string;
  /** 0–100 score: how strongly this rule matched. Drives sort order + progress bar. */
  savingsScore: number;
  /** Plain-English explanation surfaced by the "Why this recommendation?" link. */
  why: string;
  /**
   * If set, this rec is hidden when the user's weekly budget exceeds this number.
   * Example: a tight-budget tip with maxBudget=75 disappears once budget rises.
   */
  maxBudget?: number;
};

// =================================================================
// Demo input
// In production this would come from props / context / a backend.
// =================================================================

const userBehavior = {
  pastSearches: ["Milk", "Eggs", "Bread", "Apples"],
  comparedProducts: ["Milk", "Eggs"],
  weeklyBudget: 75,
};

// =================================================================
// Rule engine — reference word lists
// Strings are matched case-insensitively (see lowerSearches below).
// =================================================================

const GROCERY_STAPLES = ["milk", "eggs", "bread", "butter", "cheese"];
const PRODUCE_ITEMS   = ["apples", "bananas", "lettuce", "tomato", "berries"];
const HOUSEHOLD_ITEMS = ["detergent", "paper towels", "soap", "trash bags"];
const BEAUTY_ITEMS    = ["shampoo", "lotion", "lipstick", "moisturizer"];

/**
 * Build the recommendation list from sanitized behavior + the current budget.
 *
 * Each `if` block is an independent rule. Rules are intentionally simple and
 * transparent — the goal is that we can always answer "why did this card
 * appear?" in one sentence (that sentence is stored on the rec as `why`).
 */
function generateRecommendations(
  pastSearches: string[],
  comparedProducts: string[],
  budget: number
): Recommendation[] {
  const recs: Recommendation[] = [];
  const lowerSearches = pastSearches.map((s) => s.toLowerCase());

  // --- Counts that several rules consume below ---
  const grocerySearchCount = lowerSearches.filter((s) =>
    GROCERY_STAPLES.includes(s)
  ).length;
  const produceSearchCount = lowerSearches.filter((s) =>
    PRODUCE_ITEMS.includes(s)
  ).length;
  // Household / Beauty use substring matching so "laundry detergent" hits "detergent".
  const householdHits = lowerSearches.filter((s) =>
    HOUSEHOLD_ITEMS.some((item) => s.includes(item))
  ).length;
  const beautyHits = lowerSearches.filter((s) =>
    BEAUTY_ITEMS.some((item) => s.includes(item))
  ).length;

  // Rule 1 — Heavy grocery searcher
  // Trigger: 2+ staple searches. Score scales with how many.
  if (grocerySearchCount >= 2) {
    recs.push({
      id: "grocery-weekly",
      category: "Groceries",
      title: "Weekly Grocery Savings",
      message: "You often search grocery basics. Check grocery deals this week.",
      action: "View Grocery Deals",
      savingsScore: Math.min(70 + grocerySearchCount * 5, 95),
      why: `You searched grocery basics ${grocerySearchCount} times this week.`,
    });
  }

  // Rule 2 — Comparison shopper
  // Trigger: user actively compared 2+ products → price-sensitive on staples.
  if (comparedProducts.length >= 2) {
    recs.push({
      id: "compare-staples",
      category: "Pantry",
      title: "Staple Price Watch",
      message:
        "You compared prices on staples recently. We'll surface the cheapest options first.",
      action: "View Lowest Prices",
      savingsScore: 84,
      why: `You compared ${comparedProducts.length} staple products this week.`,
    });
  }

  // Rule 3 — Produce-curious
  // Trigger: any produce in recent searches. Timing matters more for fresh items.
  if (produceSearchCount >= 1) {
    recs.push({
      id: "produce-fresh",
      category: "Produce",
      title: "Fresh Produce Savings",
      message:
        "You searched produce recently. Compare prices before your next grocery trip.",
      action: "Compare Produce Deals",
      savingsScore: 76,
      why: "Fruits or vegetables appeared in your recent searches.",
    });
  }

  // Rule 4 — Mixed staples + produce
  // Trigger: both pantry and fresh items in the list → suggest early-week shopping.
  if (grocerySearchCount >= 1 && produceSearchCount >= 1) {
    recs.push({
      id: "early-week-shop",
      category: "Groceries",
      title: "Shop Early in the Week",
      message:
        "Fresh items are often better stocked and priced earlier in the week.",
      action: "Plan Early Grocery Trip",
      savingsScore: 81,
      why: "Your list mixes pantry staples with fresh items.",
    });
  }

  // Rule 5 — Household interest
  if (householdHits >= 1) {
    recs.push({
      id: "household-bulk",
      category: "Household",
      title: "Stock Up on Household Basics",
      message:
        "Cleaning supplies are usually cheaper per unit when bought in bulk on sale weeks.",
      action: "View Household Deals",
      savingsScore: 72,
      why: "You recently searched household products.",
    });
  }

  // Rule 6 — Beauty interest
  if (beautyHits >= 1) {
    recs.push({
      id: "beauty-swap",
      category: "Beauty",
      title: "Beauty Aisle Swaps",
      message:
        "Store-brand basics often match name-brand quality at a lower price.",
      action: "View Beauty Deals",
      savingsScore: 68,
      why: "Beauty products appeared in your recent searches.",
    });
  }

  // Rule 7 — Tight weekly budget (≤ $75)
  // Tagged with maxBudget=75 so it's hidden as soon as the user raises the budget.
  if (budget > 0 && budget <= 75) {
    recs.push({
      id: "budget-essentials",
      category: "Groceries",
      title: "Essentials First",
      message:
        "With a tighter weekly budget, prioritize must-haves before treats and bulk buys.",
      action: "View Essentials List",
      savingsScore: 90,
      why: `Your weekly budget of $${budget} flagged this as a tight-budget tip.`,
      maxBudget: 75,
    });
  }

  // Rule 8 — Comfortable budget (≥ $200)
  if (budget >= 200) {
    recs.push({
      id: "budget-bulk",
      category: "Pantry",
      title: "Bulk-Buy Opportunity",
      message:
        "Your budget can absorb bulk pantry buys — great for long-term savings on staples.",
      action: "View Bulk Deals",
      savingsScore: 78,
      why: `Your weekly budget of $${budget} supports larger upfront buys.`,
    });
  }

  // Fallback so the UI is never empty for a brand-new user.
  if (recs.length === 0) {
    recs.push({
      id: "default-explore",
      category: "Groceries",
      title: "Start Exploring Deals",
      message:
        "Search and compare a few items so we can tailor weekly savings tips to you.",
      action: "Browse Deals",
      savingsScore: 50,
      why: "We don't have enough behavior data yet to personalize.",
    });
  }

  // Strongest matches first.
  return recs.sort((a, b) => b.savingsScore - a.savingsScore);
}

// =================================================================
// Component
// =================================================================

const FILTER_CATEGORIES: ReadonlyArray<FilterValue> = [
  "All",
  "Groceries",
  "Produce",
  "Pantry",
  "Household",
  "Beauty",
];

export default function UserRecommendations() {
  // ---- Sanitization ----
  // Memoized so the auth/privacy check only runs when the input changes.
  // (With static demo input this is purely defensive — but it's the right
  // shape for real props/context.)
  const safeData = useMemo(
    () => sanitizeBehaviorData(userBehavior, true, "user"),
    []
  );

  // ---- State ----
  // IMPORTANT: every hook lives ABOVE any conditional return. If we early-
  // returned on the error case before these, React would throw "rendered fewer
  // hooks than expected" the next time a render took the success path.
  const [selectedCategory, setSelectedCategory] = useState<FilterValue>("All");

  // Lazy initializer (the function only runs on the very first render).
  // Cleaner than wrapping the same logic in useMemo + passing into useState.
  const [budget, setBudget] = useState<string>(() => {
    if ("error" in safeData) return "75";
    if (safeData.budgetLevel === "low") return "75";
    if (safeData.budgetLevel === "medium") return "150";
    return "300";
  });

  const [savedIds, setSavedIds] = useState<string[]>([]);
  const [dismissedIds, setDismissedIds] = useState<string[]>([]);
  const [expandedWhyId, setExpandedWhyId] = useState<string | null>(null);
  const [activePlan, setActivePlan] = useState<string | null>(null);

  // ---- Derived data ----
  // Re-run the rule engine whenever the budget changes.
  const allRecommendations = useMemo(() => {
    if ("error" in safeData) return [];
    return generateRecommendations(
      userBehavior.pastSearches,
      userBehavior.comparedProducts,
      Number(budget) || 0
    );
  }, [budget, safeData]);

  // Apply the current view filters.
  const filteredRecommendations = useMemo(() => {
    const budgetNumber = Number(budget) || 0;
    return allRecommendations.filter((rec) => {
      const matchesCategory =
        selectedCategory === "All" || rec.category === selectedCategory;
      const notDismissed = !dismissedIds.includes(rec.id);
      const withinBudget =
        rec.maxBudget === undefined || budgetNumber <= rec.maxBudget;
      return matchesCategory && notDismissed && withinBudget;
    });
  }, [allRecommendations, selectedCategory, budget, dismissedIds]);

  // ---- Stable handlers ----
  // useCallback keeps function identity stable across renders — useful if
  // any of these get passed into memo'd children later.

  const toggleSave = useCallback((id: string) => {
    setSavedIds((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
    );
  }, []);

  const dismissRecommendation = useCallback((id: string) => {
    // Guard against duplicate dismiss IDs.
    setDismissedIds((prev) => (prev.includes(id) ? prev : [...prev, id]));
  }, []);

  const restoreDismissed = useCallback(() => setDismissedIds([]), []);

  /** Reset filters back to defaults — does NOT touch saved items. */
  const resetSuggestions = useCallback(() => {
    setSelectedCategory("All");
    setDismissedIds([]);
    setExpandedWhyId(null);
    setActivePlan(null);
  }, []);

  /** Numeric-only input, capped at 6 digits to keep the layout sane. */
  const handleBudgetChange = useCallback((text: string) => {
    if (/^\d{0,6}$/.test(text)) setBudget(text);
  }, []);

  // ---- Now safe to early-return ----
  // All hooks above have already run unconditionally on this render.
  // Branching directly on `"error" in safeData` lets TS narrow the type
  // in the JSX below without any casts.
  if ("error" in safeData) {
    return (
      <View style={styles.container}>
        <Text style={styles.heading}>User Savings Recommendation</Text>
        <Text style={styles.emptyText}>{safeData.error}</Text>
      </View>
    );
  }

  // From here on, TS knows `safeData` is the success type.
  return (
    <View style={styles.container}>
      <Text style={styles.heading}>User Savings Recommendation</Text>
      <Text style={styles.subheading}>
        Interactive weekly savings suggestions using protected behavior summaries.
      </Text>

      {/* Sanitized summary — never shows raw search terms. */}
      <View style={styles.securityBox}>
        <Text style={styles.securityText}>
          Protected Input: {safeData.pastSearchCount} searches,{" "}
          {safeData.comparedProductCount} comparisons, budget level:{" "}
          {safeData.budgetLevel}
        </Text>
      </View>

      {activePlan && (
        <View style={styles.activePlanBox}>
          <Text style={styles.activePlanText}>Active Savings Plan: {activePlan}</Text>
        </View>
      )}

      <Text style={styles.label}>Weekly Budget ($)</Text>
      <TextInput
        style={styles.input}
        value={budget}
        onChangeText={handleBudgetChange}
        keyboardType="numeric"
        placeholder="Enter weekly budget"
        accessibilityLabel="Weekly budget in dollars"
      />

      {/* Category filter pills */}
      <View style={styles.filterRow}>
        {FILTER_CATEGORIES.map((category) => (
          <TouchableOpacity
            key={category}
            style={[
              styles.filterButton,
              selectedCategory === category && styles.activeFilter,
            ]}
            onPress={() => setSelectedCategory(category)}
            accessibilityRole="button"
            accessibilityState={{ selected: selectedCategory === category }}
          >
            <Text
              style={[
                styles.filterText,
                selectedCategory === category && styles.activeFilterText,
              ]}
            >
              {category}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* Toolbar — Refresh always visible; Restore appears only when needed. */}
      <View style={styles.toolbarRow}>
        <TouchableOpacity style={styles.refreshButton} onPress={resetSuggestions}>
          <Text style={styles.refreshButtonText}>Refresh Suggestions</Text>
        </TouchableOpacity>

        {dismissedIds.length > 0 && (
          <TouchableOpacity style={styles.refreshButton} onPress={restoreDismissed}>
            <Text style={styles.refreshButtonText}>
              Restore {dismissedIds.length} Dismissed
            </Text>
          </TouchableOpacity>
        )}
      </View>

      {/* Recommendation cards */}
      {filteredRecommendations.length === 0 ? (
        <Text style={styles.emptyText}>
          No recommendations match your current filters.
        </Text>
      ) : (
        filteredRecommendations.map((rec) => {
          const isSaved = savedIds.includes(rec.id);
          const isExpanded = expandedWhyId === rec.id;

          return (
            <View key={rec.id} style={styles.card}>
              <Text style={styles.category}>{rec.category}</Text>
              <Text style={styles.title}>{rec.title}</Text>
              <Text style={styles.message}>{rec.message}</Text>

              <Text style={styles.score}>Savings Match: {rec.savingsScore}%</Text>

              {/* Progress bar — width is the score directly. */}
              <View
                style={styles.progressTrack}
                accessibilityRole="progressbar"
                accessibilityValue={{ now: rec.savingsScore, min: 0, max: 100 }}
              >
                <View
                  style={[styles.progressFill, { width: `${rec.savingsScore}%` }]}
                />
              </View>

              <TouchableOpacity
                onPress={() => setExpandedWhyId(isExpanded ? null : rec.id)}
              >
                <Text style={styles.whyLink}>
                  {isExpanded ? "Hide reason" : "Why this recommendation?"}
                </Text>
              </TouchableOpacity>

              {isExpanded && <Text style={styles.whyText}>{rec.why}</Text>}

              <View style={styles.actionRow}>
                <TouchableOpacity
                  style={styles.primaryButton}
                  onPress={() => {
                    // Activating a plan also focuses the matching filter so
                    // the user sees only related cards underneath.
                    setActivePlan(rec.title);
                    setSelectedCategory(rec.category);
                  }}
                >
                  <Text style={styles.primaryButtonText}>{rec.action}</Text>
                </TouchableOpacity>

                <TouchableOpacity
                  style={styles.secondaryButton}
                  onPress={() => toggleSave(rec.id)}
                >
                  <Text style={styles.secondaryButtonText}>
                    {isSaved ? "Saved" : "Save"}
                  </Text>
                </TouchableOpacity>

                <TouchableOpacity
                  style={styles.dismissButton}
                  onPress={() => dismissRecommendation(rec.id)}
                >
                  <Text style={styles.dismissButtonText}>Dismiss</Text>
                </TouchableOpacity>
              </View>
            </View>
          );
        })
      )}

      <View style={styles.savedPanel}>
        <Text style={styles.savedCount}>
          Saved recommendations: {savedIds.length}
        </Text>
        <Text style={styles.savedHint}>
          Save useful plans or dismiss ones that do not fit your shopping goals.
        </Text>
      </View>
    </View>
  );
}

// =================================================================
// Styles
// =================================================================

const styles = StyleSheet.create({
  container: {
    padding: 16,
    backgroundColor: "#F7F9FC",
    borderRadius: 12,
    marginTop: 20,
  },
  heading: { fontSize: 22, fontWeight: "bold", marginBottom: 6 },
  subheading: { fontSize: 14, marginBottom: 12 },

  // --- Sanitization status banner ---
  securityBox: {
    backgroundColor: "#EAF7EA",
    padding: 10,
    borderRadius: 8,
    marginBottom: 12,
  },
  securityText: { fontSize: 13, fontWeight: "600" },

  // --- Active plan banner ---
  activePlanBox: {
    backgroundColor: "#FFF4D6",
    padding: 10,
    borderRadius: 8,
    marginBottom: 12,
  },
  activePlanText: { fontWeight: "bold" },

  // --- Budget input ---
  label: { fontWeight: "600", marginBottom: 6 },
  input: {
    backgroundColor: "#fff",
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    padding: 10,
    marginBottom: 12,
  },

  // --- Category filter pills ---
  filterRow: { flexDirection: "row", flexWrap: "wrap", marginBottom: 12 },
  filterButton: {
    paddingVertical: 8,
    paddingHorizontal: 12,
    backgroundColor: "#fff",
    borderRadius: 20,
    marginRight: 8,
    marginBottom: 8,
    borderWidth: 1,
    borderColor: "#ccc",
  },
  activeFilter: { backgroundColor: "#87b0dbff", borderColor: "#87b0dbff" },
  filterText: { fontSize: 13 },
  activeFilterText: { color: "#fff", fontWeight: "bold" },

  // --- Toolbar (Refresh + Restore live here side-by-side) ---
  toolbarRow: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 8, // requires React Native 0.71+
    marginBottom: 12,
  },
  refreshButton: {
    backgroundColor: "#fff",
    borderWidth: 1,
    borderColor: "#87b0dbff",
    padding: 10,
    borderRadius: 8,
    flexGrow: 1,
    flexBasis: 0,
    minWidth: 140,
  },
  refreshButtonText: {
    color: "#4A6FA5",
    fontWeight: "bold",
    textAlign: "center",
  },

  // --- Recommendation card ---
  card: {
    backgroundColor: "#E8F4FF",
    padding: 14,
    borderRadius: 10,
    marginBottom: 10,
  },
  category: {
    fontSize: 12,
    fontWeight: "bold",
    color: "#4A6FA5",
    marginBottom: 4,
  },
  title: { fontSize: 16, fontWeight: "bold" },
  message: { fontSize: 14, marginTop: 4 },
  score: { marginTop: 8, fontWeight: "600" },

  // --- Score progress bar ---
  progressTrack: {
    height: 8,
    backgroundColor: "#D6DCE8",
    borderRadius: 10,
    marginTop: 6,
    overflow: "hidden",
  },
  progressFill: {
    height: 8,
    backgroundColor: "#679bd6ff",
    borderRadius: 10,
  },

  // --- "Why this recommendation?" disclosure ---
  whyLink: { marginTop: 10, color: "#2F6FB2", fontWeight: "bold" },
  whyText: { marginTop: 6, fontSize: 13, fontStyle: "italic" },

  // --- Card action buttons ---
  actionRow: { flexDirection: "row", flexWrap: "wrap", marginTop: 10 },
  primaryButton: {
    backgroundColor: "#87b0dbff",
    paddingVertical: 8,
    paddingHorizontal: 10,
    borderRadius: 8,
    marginRight: 6,
    marginBottom: 6,
  },
  primaryButtonText: { color: "#fff", fontWeight: "bold", fontSize: 12 },
  secondaryButton: {
    backgroundColor: "#fff",
    paddingVertical: 8,
    paddingHorizontal: 10,
    borderRadius: 8,
    marginRight: 6,
    marginBottom: 6,
    borderWidth: 1,
    borderColor: "#87b0dbff",
  },
  secondaryButtonText: { color: "#4A6FA5", fontWeight: "bold", fontSize: 12 },
  dismissButton: {
    backgroundColor: "#fff",
    paddingVertical: 8,
    paddingHorizontal: 10,
    borderRadius: 8,
    marginBottom: 6,
    borderWidth: 1,
    borderColor: "#ccc",
  },
  dismissButtonText: { color: "#555", fontSize: 12 },

  // --- Empty + saved-panel states ---
  emptyText: { fontStyle: "italic", marginTop: 10 },
  savedPanel: {
    backgroundColor: "#fff",
    padding: 10,
    borderRadius: 8,
    marginTop: 10,
  },
  savedCount: { fontWeight: "600" },
  savedHint: { fontSize: 12, marginTop: 4 },
});