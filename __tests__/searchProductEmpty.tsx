import { describe, it, expect } from "@jest/globals";
import { findCheapest } from "../utils/priceComparison";

// Tests to make sure findCheapest handles cases where the product input is empty or doesn’t exist.

describe("findCheapest empty/invalid input tests", () => {

  it("returns null for empty string input", () => {
    const result = findCheapest("");
    expect(result).toBeNull();
  });

  it("returns null for a product not in the database", () => {
    const result = findCheapest("Dodo feathers"); // nonexistent product
    expect(result).toBeNull();
  });

  it("returns null for null input", () => {
    const result = findCheapest(null as unknown as string);
    expect(result).toBeNull();
  });

  it("returns null for undefined input", () => {
    const result = findCheapest(undefined as unknown as string);
    expect(result).toBeNull();
  });

});
