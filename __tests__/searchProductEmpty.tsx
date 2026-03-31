import { describe, it, expect } from "@jest/globals";
import { findCheapest } from "../utils/priceComparison";

// Tests to make sure findCheapest handles cases where the product input is empty or doesn’t exist.

describe("findCheapest empty/invalid input tests", () => {

  // Helper wrapper to handle null/undefined
  const safeCall = (input: string | null | undefined) => {
    if (input === null || input === undefined) {
      return { error: "Invalid product input" };
    }
    return findCheapest(input);
  };

  it("returns null for empty string input", () => {
    const result = safeCall(""); // empty string is safe
    expect(result).toBeNull();
  });

  it("returns null for a product not in the database", () => {
    const result = safeCall("Dodo feathers"); // invalid product
    expect(result).toBeNull();
  });

  it("returns an error message for null input", () => {
    const result = safeCall(null);
    expect(result).toEqual({ error: "Invalid product input" });
  });

  it("returns an error message for undefined input", () => {
    const result = safeCall(undefined);
    expect(result).toEqual({ error: "Invalid product input" });
  });

});
