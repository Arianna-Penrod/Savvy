import { describe, it, expect } from "@jest/globals";
import { recommendProducts } from "../utils/recommendation";

/*
  These tests validate the recommendation system logic.
  The function should:
  - Recommend products based on user's purchase history
*/

describe("recommendProducts function tests", () => {

  it("recommends related products based on previous purchases", () => {
    const purchaseHistory = ["Laptop", "Mouse"];

    const result = recommendProducts(purchaseHistory);

    expect(result).toContain("Keyboard");
    expect(result).toContain("Laptop Bag");
  });

  it("does not recommend already purchased products", () => {
    const purchaseHistory = ["Laptop"];

    const result = recommendProducts(purchaseHistory);

    expect(result).not.toContain("Laptop");
  });

  it("returns popular products if no purchase history exists", () => {
    const purchaseHistory = [];

    const result = recommendProducts(purchaseHistory);

    expect(result.length).toBeGreaterThan(0);
    expect(result).toContain("Best Seller Item");
  });

});
