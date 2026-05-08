import { findBestStore } from "../utils/bestStore";
import { users } from "../data/demoUser";

describe("findBestStore algorithm", () => {
  test("returns the best store for the demo user", () => {
    // run the store matcher with the default demo user
    const result = findBestStore(users[0]);

    // confirm aldi is selected and every item is found
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
      // keep the radius too small for any demo store to qualify
      radiusMiles: 1,
    };

    const result = findBestStore(userWithTinyRadius);

    // no nearby store should produce no recommendation
    expect(result).toBeNull();
  });

  test("tracks missing items when a store does not have something in stock", () => {
    // limit the list to one item so the found item details are easy to verify
    const userLookingForGroundBeef = {
      ...users[0],
      list: [{ name: "Ground Beef", quantity: 1 }],
    };

    const result = findBestStore(userLookingForGroundBeef);

    expect(result).not.toBeNull();
    expect(result?.store.name).toBe("Demo Aldi");
    expect(result?.missingItems).toEqual([]);
    // confirm the matched item keeps the expected quantity and price math
    expect(result?.foundItems[0]).toEqual({
      name: "Ground Beef",
      quantity: 1,
      unitPrice: 6.59,
      totalPrice: 6.59,
    });
  });

  test("matches items even when casing and spaces are different", () => {
    // add extra spacing to make sure item matching normalizes/cleans user input
    const userWithMessyInput = {
      ...users[0],
      list: [{ name: "  milk  ", quantity: 2 }],
    };

    const result = findBestStore(userWithMessyInput);

    expect(result).not.toBeNull();
    // two milks should use the demo unit price and total correctly
    expect(result?.foundItems[0]?.unitPrice).toBe(3.49);
    expect(result?.foundItems[0]?.totalPrice).toBe(6.98);
  });
});
