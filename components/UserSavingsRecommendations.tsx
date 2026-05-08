import React, { useMemo } from "react";
import { View, Text, StyleSheet } from "react-native";

/**
 * WeeklySavingsRecommendations
 *
 * Lightweight, rule-driven companion to <UserRecommendations />.
 * Given a snapshot of behavior + a weekly budget, produces a small list of
 * plain-English savings tips. No ML — just transparent if/then rules.
 *
 * Each rule is a pure function `(behavior) => SavingsOpportunity | null`,
 * which makes adding new rules a one-liner: write the function, append it
 * to RULES.
 */

type UserBehavior = {
  searchedCategories: string[];
  viewedDeals: string[];
  weeklyBudget: number;
};

type SavingsOpportunity = {
  /** Stable React key + handy for analytics. */
  id: string;
  title: string;
  message: string;
};

type Props = { behavior: UserBehavior };
type Rule = (b: UserBehavior) => SavingsOpportunity | null;

// ---------- Rules ----------

/** Fires when the user has searched "Groceries" at least twice this week. */
const groceryRule: Rule = (b) => {
  const count = b.searchedCategories.filter((c) => c === "Groceries").length;
  if (count < 2) return null;
  return {
    id: "grocery-frequent",
    title: "Weekly Grocery Savings",
    message:
      "You searched grocery items often this week. Check grocery deals before your next trip.",
  };
};

/** Fires when produce shows up at all — produce prices swing day to day. */
const produceRule: Rule = (b) => {
  if (!b.searchedCategories.includes("Produce")) return null;
  return {
    id: "produce-fresh",
    title: "Fresh Produce Tip",
    message:
      "Produce prices vary day to day — buying earlier in the week often beats weekend prices.",
  };
};

/** Fires when any household-related deal has been viewed. */
const householdRule: Rule = (b) => {
  const signals = ["Laundry Detergent", "Paper Towels", "Cleaning Supplies"];
  if (!b.viewedDeals.some((d) => signals.includes(d))) return null;
  return {
    id: "household-compare",
    title: "Household Savings Opportunity",
    message:
      "You recently viewed household deals. This may be a good week to compare cleaning supplies.",
  };
};

/** Tight budget (≤ $75): essentials-first reminder. */
const tightBudgetRule: Rule = (b) => {
  if (b.weeklyBudget <= 0 || b.weeklyBudget > 75) return null;
  return {
    id: "budget-tight",
    title: "Budget-Friendly Tip",
    message:
      "Based on your weekly budget, focus on essential deals first to maximize savings.",
  };
};

/** Comfortable budget (≥ $200): bulk-buy window. */
const comfortableBudgetRule: Rule = (b) => {
  if (b.weeklyBudget < 200) return null;
  return {
    id: "budget-bulk",
    title: "Bulk-Buy Window",
    message:
      "Your weekly budget can absorb bulk pantry buys — a good way to lower per-unit cost over time.",
  };
};

/** Heavy deal viewer: encourage saving favorites for better future ranking. */
const dealHunterRule: Rule = (b) => {
  if (b.viewedDeals.length < 5) return null;
  return {
    id: "deal-hunter",
    title: "You're a Deal Hunter",
    message:
      "You've viewed several deals this week. Save your favorites so we can prioritize similar ones.",
  };
};

const RULES: Rule[] = [
  groceryRule,
  produceRule,
  householdRule,
  tightBudgetRule,
  comfortableBudgetRule,
  dealHunterRule,
];

function getWeeklySavingsOpportunities(
  behavior: UserBehavior
): SavingsOpportunity[] {
  // Run every rule and drop the nulls.
  const recs = RULES.map((rule) => rule(behavior)).filter(
    (r): r is SavingsOpportunity => r !== null
  );

  // Friendly fallback so the list is never empty.
  if (recs.length === 0) {
    recs.push({
      id: "no-data",
      title: "No New Savings Yet",
      message:
        "Keep searching and viewing deals so we can suggest better weekly savings opportunities.",
    });
  }

  return recs;
}

// ---------- Component ----------

export default function WeeklySavingsRecommendations({ behavior }: Props) {
  const recommendations = useMemo(
    () => getWeeklySavingsOpportunities(behavior),
    [behavior]
  );

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Weekly Savings Opportunities</Text>

      {recommendations.map((item) => (
        <View key={item.id} style={styles.card}>
          <Text style={styles.title}>{item.title}</Text>
          <Text style={styles.message}>{item.message}</Text>
        </View>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { padding: 16, backgroundColor: "#fff" },
  heading: { fontSize: 20, fontWeight: "bold", marginBottom: 10 },
  card: {
    backgroundColor: "#E8F4FF",
    padding: 14,
    borderRadius: 10,
    marginBottom: 10,
  },
  title: { fontSize: 16, fontWeight: "bold", marginBottom: 4 },
  message: { fontSize: 14 },
});