import { findBestStore } from "../utils/bestStore";
import { users } from "../data/demoUser";

describe("findBestStore algorithm", () => {
  test("returns the best store for the demo user", () => {
    const result = findBestStore(users[0]);

    expect(result).not.toBeNull();
    expect(result?.store.name).toBe("Demo Aldi");
    expect(result?.missingItems).toEqual([]);
    expect(result?.totalPrice).toBeCloseTo(17.15);
  });

  test("returns null when no stores are inside the user's radius", () => {
    const userWithTinyRadius = {
      ...users[0],
      location: {
        lat: 0,
        long: 0,
      },
      radiusMiles: 1,
    };

    const result = findBestStore(userWithTinyRadius);

    expect(result).toBeNull();
  });

  test("tracks missing items when a store does not have something in stock", () => {
    const userLookingForGroundBeef = {
      ...users[0],
      list: [{ name: "Ground Beef", quantity: 1 }],
    };

    const result = findBestStore(userLookingForGroundBeef);

    expect(result).not.toBeNull();
    expect(result?.store.name).toBe("Demo Aldi");
    expect(result?.missingItems).toEqual([]);
    expect(result?.foundItems[0]).toEqual({
      name: "Ground Beef",
      quantity: 1,
      unitPrice: 6.59,
      totalPrice: 6.59,
    });
  });

  test("matches items even when casing and spaces are different", () => {
    const userWithMessyInput = {
      ...users[0],
      list: [{ name: "  milk  ", quantity: 2 }],
    };

    const result = findBestStore(userWithMessyInput);

    expect(result).not.toBeNull();
    expect(result?.foundItems[0]?.unitPrice).toBe(3.49);
    expect(result?.foundItems[0]?.totalPrice).toBe(6.98);
  });
});
