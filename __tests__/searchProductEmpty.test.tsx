import { describe, it, expect } from "@jest/globals";
import { findCheapest } from "../utils/priceComparison";

describe("findCheapest empty and invalid input tests", () => {
  it("returns null for empty string input", () => {
    expect(findCheapest("")).toBeNull();
  });

  it("returns null for a product not in the database", () => {
    expect(findCheapest("Dodo feathers")).toBeNull();
  });

  it("returns null for a product with only spaces", () => {
    expect(findCheapest("   ")).toBeNull();
  });
});