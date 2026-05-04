import { describe, it, expect } from "@jest/globals";
import { findCheapest } from "../utils/priceComparison";

describe("findCheapest function tests", () => {
  it("returns cheapest price for Milk", () => {
    const result = findCheapest("Milk");

    expect(result).toEqual({
      store: "Demo Walmart",
      price: 3.49,
    });
  });

  it("returns cheapest price for Bread", () => {
    const result = findCheapest("Bread");

    expect(result).toEqual({
      store: "Demo Target",
      price: 2.29,
    });
  });

  it("returns cheapest price for Eggs", () => {
    const result = findCheapest("Eggs");

    expect(result).toEqual({
      store: "Demo Walmart",
      price: 2.99,
    });
  });
});