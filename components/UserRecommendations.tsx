import React, { useMemo, useState } from "react";
import { sanitizeBehaviorData } from "@/utils/secureUserRecommendations";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
} from "react-native";

type Recommendation = {
  id: string;
  category: string;
  title: string;
  message: string;
  action: string;
  savingsScore: number;
  why: string;
};

const userBehavior = {
  pastSearches: ["Milk", "Eggs", "Bread"],
  comparedProducts: ["Milk", "Eggs"],
  weeklyBudget: 75,
};

const demoRecommendations: Recommendation[] = [
  {
    id: "1",
    category: "Groceries",
    title: "Weekly Grocery Savings",
    message: "You often search grocery basics. Check grocery deals this week.",
    action: "View Grocery Deals",
    savingsScore: 88,
    why: "Recommended because you searched grocery basics multiple times.",

  },
  {
    id: "2",
    category: "Household",
    title: "Household Restock Tip",
    message: "You viewed cleaning items recently. This may be a good week to compare household deals.",
    action: "Compare Household Deals",
    savingsScore: 76,
    why: "Recommended because household items appeared in your recent deal activity.",

  },
  {
    id: "3",
    category: "Beauty",
    title: "Beauty Savings Alert",
    message: "Beauty items match your recent interest. Look for bundle discounts before buying.",
    action: "View Beauty Deals",
    savingsScore: 81,
    why: "Recommended because beauty deals match your recent activity pattern.",

  },
];

export default function UserRecommendations() {
 const safeData = sanitizeBehaviorData(userBehavior, true, "user");

if ("error" in safeData) {
  return <Text>{safeData.error}</Text>;
}

  const [selectedCategory, setSelectedCategory] = useState("All");
  const [budget, setBudget] = useState(
    safeData.budgetLevel === "low"
      ? "75"
      : safeData.budgetLevel === "medium"
      ? "150"
      : "300"
  );
  const [savedIds, setSavedIds] = useState<string[]>([]);
  const [dismissedIds, setDismissedIds] = useState<string[]>([]);
 const [expandedWhyId, setExpandedWhyId] = useState<string | null>(null);
  const [activePlan, setActivePlan] = useState<string | null>(null);

  const filteredRecommendations = useMemo(() => {
    return demoRecommendations.filter((rec) => {
      const matchesCategory =
        selectedCategory === "All" || rec.category === selectedCategory;

      const notDismissed = !dismissedIds.includes(rec.id);

      const budgetNumber = Number(budget) || 0;
      const matchesBudget = budgetNumber <= 75 ? rec.savingsScore >= 75 : true;

      return matchesCategory && notDismissed && matchesBudget;
    });
  }, [selectedCategory, budget, dismissedIds]);

  const toggleSave = (id: string) => {
    setSavedIds((prev) =>
      prev.includes(id)
        ? prev.filter((savedId) => savedId !== id)
        : [...prev, id]
    );
  };

  const dismissRecommendation = (id: string) => {
    setDismissedIds((prev) => [...prev, id]);
  };

   const resetSuggestions = () => {
    setSelectedCategory("All");
    setDismissedIds([]);
    setExpandedWhyId(null);
    setActivePlan(null);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>User Savings Recommendation</Text>

      <Text style={styles.subheading}>
        Interactive weekly savings suggestions using protected behavior
        summaries.
      </Text>

      <View style={styles.securityBox}>
        <Text style={styles.securityText}>
          Protected Input: {safeData.pastSearchCount} searches,{" "}
          {safeData.comparedProductCount} comparisons, budget level:{" "}
          {safeData.budgetLevel}
        </Text>
      </View>

      {activePlan && (
        <View style={styles.activePlanBox}>
          <Text style={styles.activePlanText}>
            Active Savings Plan: {activePlan}
          </Text>
        </View>
      )}

      <Text style={styles.label}>Weekly Budget</Text>
      <TextInput
        style={styles.input}
        value={budget}
        onChangeText={setBudget}
        keyboardType="numeric"
        placeholder="Enter weekly budget"
      />

      <View style={styles.filterRow}>
        {["All", "Groceries", "Household", "Beauty"].map((category) => (
          <TouchableOpacity
            key={category}
            style={[
              styles.filterButton,
              selectedCategory === category && styles.activeFilter,
            ]}
            onPress={() => setSelectedCategory(category)}
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

      <TouchableOpacity style={styles.refreshButton} onPress={resetSuggestions}>
        <Text style={styles.refreshButtonText}>Refresh Suggestions</Text>
      </TouchableOpacity>

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

              <TouchableOpacity
                onPress={() =>
                  setExpandedWhyId(isExpanded ? null : rec.id)
                }
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

const styles = StyleSheet.create({
  container: {
    padding: 16,
    backgroundColor: "#F7F9FC",
    borderRadius: 12,
    marginTop: 20,
  },
  heading: {
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 6,
  },
  subheading: {
    fontSize: 14,
    marginBottom: 12,
  },
  securityBox: {
    backgroundColor: "#EAF7EA",
    padding: 10,
    borderRadius: 8,
    marginBottom: 12,
  },
  securityText: {
    fontSize: 13,
    fontWeight: "600",
  },
  activePlanBox: {
    backgroundColor: "#FFF4D6",
    padding: 10,
    borderRadius: 8,
    marginBottom: 12,
  },
  activePlanText: {
    fontWeight: "bold",
  },
  label: {
    fontWeight: "600",
    marginBottom: 6,
  },
  input: {
    backgroundColor: "#fff",
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    padding: 10,
    marginBottom: 12,
  },
  filterRow: {
    flexDirection: "row",
    flexWrap: "wrap",
    marginBottom: 12,
  },
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
  activeFilter: {
    backgroundColor: "#87b0dbff",
    borderColor: "#87b0dbff",
  },
  filterText: {
    fontSize: 13,
  },
  activeFilterText: {
    color: "#fff",
    fontWeight: "bold",
  },
  refreshButton: {
    backgroundColor: "#fff",
    borderWidth: 1,
    borderColor: "#87b0dbff",
    padding: 10,
    borderRadius: 8,
    marginBottom: 12,
  },
  refreshButtonText: {
    color: "#4A6FA5",
    fontWeight: "bold",
    textAlign: "center",
  },
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
  title: {
    fontSize: 16,
    fontWeight: "bold",
  },
  message: {
    fontSize: 14,
    marginTop: 4,
  },
  score: {
    marginTop: 8,
    fontWeight: "600",
  },
  progressTrack: {
    height: 8,
    backgroundColor: "#D6DCE8",
    borderRadius: 10,
    marginTop: 6,
    overflow: "hidden",
  },
  progressFill: {
    height: 8,
    backgroundColor: "#4CAF50",
    borderRadius: 10,
  },
  challengeBox: {
    backgroundColor: "#fff",
    padding: 10,
    borderRadius: 8,
    marginTop: 10,
  },
  challengeText: {
    fontSize: 13,
    fontWeight: "600",
  },
  whyLink: {
    marginTop: 10,
    color: "#2F6FB2",
    fontWeight: "bold",
  },
  whyText: {
    marginTop: 6,
    fontSize: 13,
    fontStyle: "italic",
  },
  actionRow: {
    flexDirection: "row",
    flexWrap: "wrap",
    marginTop: 10,
  },
  primaryButton: {
    backgroundColor: "#87b0dbff",
    paddingVertical: 8,
    paddingHorizontal: 10,
    borderRadius: 8,
    marginRight: 6,
    marginBottom: 6,
  },
  primaryButtonText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 12,
  },
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
  secondaryButtonText: {
    color: "#4A6FA5",
    fontWeight: "bold",
    fontSize: 12,
  },
  dismissButton: {
    backgroundColor: "#fff",
    paddingVertical: 8,
    paddingHorizontal: 10,
    borderRadius: 8,
    marginBottom: 6,
    borderWidth: 1,
    borderColor: "#ccc",
  },
  dismissButtonText: {
    color: "#555",
    fontSize: 12,
  },
  emptyText: {
    fontStyle: "italic",
    marginTop: 10,
  },
  savedPanel: {
    backgroundColor: "#fff",
    padding: 10,
    borderRadius: 8,
    marginTop: 10,
  },
  savedCount: {
    fontWeight: "600",
  },
  savedHint: {
    fontSize: 12,
    marginTop: 4,
  },
});