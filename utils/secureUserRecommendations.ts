type Role = "guest" | "user" | "admin";

type UserBehavior = {
  pastSearches: string[];
  comparedProducts: string[];
  weeklyBudget: number;
  location?: {
    latitude: number;
    longitude: number;
  };
};

type SafeRecommendationInput = {
  pastSearchCount: number;
  comparedProductCount: number;
  budgetLevel: "low" | "medium" | "high";
};

export function canAccessRecommendations(isLoggedIn: boolean, role: Role) {
  return isLoggedIn && (role === "user" || role === "admin");
}

export function sanitizeBehaviorData(
  behavior: UserBehavior,
  isLoggedIn: boolean,
  role: Role
): SafeRecommendationInput | { error: string } {
  if (!canAccessRecommendations(isLoggedIn, role)) {
    return { error: "Unauthorized access to recommendation data" };
  }

  return {
    pastSearchCount: behavior.pastSearches.length,
    comparedProductCount: behavior.comparedProducts.length,
    budgetLevel:
      behavior.weeklyBudget <= 75
        ? "low"
        : behavior.weeklyBudget <= 150
        ? "medium"
        : "high",
  };
}