/**
 * secureUserRecommendations.ts
 *
 * Authorization + sanitization layer between raw user behavior and the
 * recommendation engine. Anything the engine sees passes through here first:
 *   • The engine never receives raw search terms, exact coordinates, or
 *     anything else that could re-identify a user.
 *   • Access checks live in one place — `canAccessRecommendations`.
 *   • Location is OPT-IN. The default call returns no location data at all.
 */

type Role = "guest" | "user" | "admin";

type UserBehavior = {
  pastSearches: string[];
  comparedProducts: string[];
  weeklyBudget: number;
  /** Raw coordinates. NEVER returned to the engine — only coarse data is. */
  location?: {
    latitude: number;
    longitude: number;
  };
};

/**
 * Continent-level region. Far too coarse to identify an individual,
 * which is the point — the engine only needs "is this user in NA?"
 * to route region-specific deals.
 */
type LocationRegion =
  | "north_america"
  | "south_america"
  | "europe"
  | "africa"
  | "asia"
  | "oceania"
  | "antarctica"
  | "unknown";

/**
 * Sanitized location. Coordinates are rounded to 1 decimal place
 * (~11 km granularity at the equator) — enough to distinguish "Oklahoma City"
 * from "Tulsa," not enough to point at anyone's house.
 */
export type CoarseLocation = {
  approxLatitude: number;
  approxLongitude: number;
  region: LocationRegion;
};

export type SafeRecommendationInput = {
  pastSearchCount: number;
  comparedProductCount: number;
  budgetLevel: "low" | "medium" | "high";
  /** Present only when the caller passes { includeLocation: true }. */
  location?: CoarseLocation;
};

// ---------- Validation helpers ----------

/** Reject NaN, Infinity, and out-of-range coordinates. */
function isValidCoordinate(lat: number, lng: number): boolean {
  return (
    Number.isFinite(lat) &&
    Number.isFinite(lng) &&
    lat >= -90 &&
    lat <= 90 &&
    lng >= -180 &&
    lng <= 180
  );
}

/**
 * Round a coordinate to `decimals` places. 1 decimal is intentional:
 * roughly 11 km of precision is enough for region-level deal routing
 * and far below the threshold typically considered re-identifying.
 */
function coarsenCoordinate(value: number, decimals = 1): number {
  const factor = 10 ** decimals;
  return Math.round(value * factor) / factor;
}

/**
 * Map (lat, lng) to a continent bucket. Boundaries are deliberately rough —
 * region tagging only needs to be good enough to route region-specific deals.
 */
function getRegion(lat: number, lng: number): LocationRegion {
  if (lat >= 15 && lat <= 75 && lng >= -170 && lng <= -50) return "north_america";
  if (lat >= -60 && lat < 15 && lng >= -90 && lng <= -30) return "south_america";
  if (lat >= 35 && lat <= 75 && lng >= -25 && lng <= 60) return "europe";
  if (lat >= -35 && lat < 35 && lng >= -20 && lng <= 55) return "africa";
  if (lat >= -10 && lat <= 75 && lng > 60 && lng <= 180) return "asia";
  if (lat >= -50 && lat < -10 && lng >= 110 && lng <= 180) return "oceania";
  if (lat < -60) return "antarctica";
  return "unknown";
}

/**
 * Convert raw location into a CoarseLocation. Returns `undefined` when no
 * location is provided OR coordinates fail validation.
 *
 * We return `undefined` rather than an error string on bad input — the engine
 * should silently degrade rather than expose anything about the user's input.
 */
export function sanitizeLocation(
  location: UserBehavior["location"]
): CoarseLocation | undefined {
  if (!location) return undefined;
  const { latitude, longitude } = location;
  if (!isValidCoordinate(latitude, longitude)) return undefined;

  return {
    approxLatitude: coarsenCoordinate(latitude, 1),
    approxLongitude: coarsenCoordinate(longitude, 1),
    region: getRegion(latitude, longitude),
  };
}

/** Bucket weekly budget; clamp invalid input (NaN/negative/Infinity) to "low". */
function normalizeBudget(weeklyBudget: number): "low" | "medium" | "high" {
  if (!Number.isFinite(weeklyBudget) || weeklyBudget < 0) return "low";
  if (weeklyBudget <= 75) return "low";
  if (weeklyBudget <= 150) return "medium";
  return "high";
}

// ---------- Public API ----------

/**
 * Authoritative access check. Guests and unauthenticated users get nothing.
 * Single source of truth for "can this caller see recs?".
 */
export function canAccessRecommendations(
  isLoggedIn: boolean,
  role: Role
): boolean {
  return isLoggedIn && (role === "user" || role === "admin");
}

type SanitizeOptions = {
  /**
   * Include coarse location in the output. Default false — callers must opt
   * in explicitly so location data never leaks to consumers that don't need it.
   */
  includeLocation?: boolean;
};

/**
 * Sanitize raw user behavior for the recommendation engine.
 *
 * Returns either a SafeRecommendationInput or a deliberately generic error
 * object. Error messages never echo input data — including role, budget,
 * or anything else that could leak via logs.
 *
 * The `options` parameter is optional and defaults to `{}`, so existing
 * call sites do not need to change.
 */
export function sanitizeBehaviorData(
  behavior: UserBehavior,
  isLoggedIn: boolean,
  role: Role,
  options: SanitizeOptions = {}
): SafeRecommendationInput | { error: string } {
  if (!canAccessRecommendations(isLoggedIn, role)) {
    // Generic message — no role echoed, no behavior fields referenced.
    return { error: "Unauthorized access to recommendation data" };
  }

  const result: SafeRecommendationInput = {
    pastSearchCount: behavior.pastSearches.length,
    comparedProductCount: behavior.comparedProducts.length,
    budgetLevel: normalizeBudget(behavior.weeklyBudget),
  };

  // Location is OPT-IN. If the caller doesn't ask for it, it never appears
  // in the output even if `behavior.location` is set.
  if (options.includeLocation) {
    const safeLocation = sanitizeLocation(behavior.location);
    if (safeLocation) result.location = safeLocation;
  }

  // Freeze the output as defense-in-depth against downstream mutation.
  return Object.freeze(result) as SafeRecommendationInput;
}