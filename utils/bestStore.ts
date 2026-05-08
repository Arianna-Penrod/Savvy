import { stores, store } from "../data/demoStores";
import { user } from "../data/demoUser";

// this type describes one shopping list item that was found at a store, including its quantity and calculated pricing
export type BestStoreItem = {
  name: string;
  quantity: number;
  unitPrice: number;
  totalPrice: number;
};

// this type describes the full result for a store after it has been checked against the user's list, location, and search radius
export type BestStoreResult = {
  store: store;
  distanceMiles: number;
  totalPrice: number;
  foundItems: BestStoreItem[];
  missingItems: string[];
};

// this helper makes item-name comparisons more forgiving by removing outside spaces and ignoring uppercase or lowercase differences
function normalize(value: string) {
  return value.trim().toLowerCase();
}

// this helper calculates the distance between two latitude and longitude points in miles
function getDistanceMiles(
  lat1: number,
  long1: number,
  lat2: number,
  long2: number
) {
  // this is the average radius of earth in miles, used by the distance formula below
  const earthRadiusMiles = 3958.8;

  // these values convert the latitude and longitude differences from degrees into radians
  const dLat = ((lat2 - lat1) * Math.PI) / 180;
  const dLong = ((long2 - long1) * Math.PI) / 180;

  // this is the haversine formula, which estimates distance across the curved surface of the earth
  const a =
    Math.sin(dLat / 2) ** 2 +
    Math.cos((lat1 * Math.PI) / 180) *
      Math.cos((lat2 * Math.PI) / 180) *
      Math.sin(dLong / 2) ** 2;

  // this converts the haversine result into a final mile distance between the user and the store
  return earthRadiusMiles * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
}

// this function checks one store and returns its match details, or null if the store is outside the user's allowed radius
function evaluateStore(currentUser: user, currentStore: store): BestStoreResult | null {
  // this distance is calculated first because stores outside the user's radius should not be considered at all
  const distanceMiles = getDistanceMiles(
    currentUser.location.lat,
    currentUser.location.long,
    currentStore.location.lat,
    currentStore.location.long
  );

  // this removes the store from consideration when it is farther away than the user wants to travel
  if (distanceMiles > currentUser.radiusMiles) {
    return null;
  }

  // these arrays are built while scanning the user's list so the app can show both matched and missing items
  const foundItems: BestStoreItem[] = [];
  const missingItems: string[] = [];

  // this loop checks each item on the user's shopping list against the current store's available stock
  for (const listItem of currentUser.list) {
    // this finds a store stock item with the same normalized name and requires it to actually be in stock
    const matchingStockItem = currentStore.stock.find(
      (stockItem) =>
        normalize(stockItem.name) === normalize(listItem.name) &&
        stockItem.inStock
    );

    // when a list item is not found or is out of stock, it is tracked as missing and the loop moves on
    if (!matchingStockItem) {
      missingItems.push(listItem.name);
      continue;
    }

    // when a matching stock item exists, the item is saved with its unit price and total price for the requested quantity
    foundItems.push({
      name: listItem.name,
      quantity: listItem.quantity,
      unitPrice: matchingStockItem.price,
      totalPrice: matchingStockItem.price * listItem.quantity,
    });
  }

  // this adds up only the items the store can actually fulfill, so missing items do not affect the total price
  const totalPrice = foundItems.reduce((sum, item) => {
    return sum + item.totalPrice;
  }, 0);

  // this object collects everything the ui needs to explain why this store was selected or what it could not provide
  return {
    store: currentStore,
    distanceMiles,
    totalPrice,
    foundItems,
    missingItems,
  };
}

// this function evaluates every demo store and returns the best one for the current user's list and location
export function findBestStore(currentUser: user): BestStoreResult | null {
  // this evaluates each store, then filters out null results so only stores inside the user's radius remain
  const evaluatedStores = stores
    .map((currentStore) => evaluateStore(currentUser, currentStore))
    .filter((result): result is BestStoreResult => result !== null);

  // if every store was outside the radius, there is no recommendation to show
  if (evaluatedStores.length === 0) {
    return null;
  }

  // this sort ranks stores by usefulness first, then cost, then distance, and the first store becomes the recommendation
  return evaluatedStores.sort((a, b) => {
    // stores that are missing fewer items are better because they fulfill more of the user's shopping list
    if (a.missingItems.length !== b.missingItems.length) {
      return a.missingItems.length - b.missingItems.length;
    }

    // when stores fulfill the same number of items, the cheaper total price wins
    if (a.totalPrice !== b.totalPrice) {
      return a.totalPrice - b.totalPrice;
    }

    // when missing items and price are tied, the closer store wins as the final tie breaker
    return a.distanceMiles - b.distanceMiles;
  })[0];
}
