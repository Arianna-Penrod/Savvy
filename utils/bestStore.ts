import { stores, store } from "../data/demoStores";
import { user } from "../data/demoUser";

export type BestStoreItem = {
  name: string;
  quantity: number;
  unitPrice: number;
  totalPrice: number;
};

export type BestStoreResult = {
  store: store;
  distanceMiles: number;
  totalPrice: number;
  foundItems: BestStoreItem[];
  missingItems: string[];
};

function normalize(value: string) {
  return value.trim().toLowerCase();
}

function getDistanceMiles(
  lat1: number,
  long1: number,
  lat2: number,
  long2: number
) {
  const earthRadiusMiles = 3958.8;

  const dLat = ((lat2 - lat1) * Math.PI) / 180;
  const dLong = ((long2 - long1) * Math.PI) / 180;

  const a =
    Math.sin(dLat / 2) ** 2 +
    Math.cos((lat1 * Math.PI) / 180) *
      Math.cos((lat2 * Math.PI) / 180) *
      Math.sin(dLong / 2) ** 2;

  return earthRadiusMiles * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
}

function evaluateStore(currentUser: user, currentStore: store): BestStoreResult | null {
  const distanceMiles = getDistanceMiles(
    currentUser.location.lat,
    currentUser.location.long,
    currentStore.location.lat,
    currentStore.location.long
  );

  if (distanceMiles > currentUser.radiusMiles) {
    return null;
  }

  const foundItems: BestStoreItem[] = [];
  const missingItems: string[] = [];

  for (const listItem of currentUser.list) {
    const matchingStockItem = currentStore.stock.find(
      (stockItem) =>
        normalize(stockItem.name) === normalize(listItem.name) &&
        stockItem.inStock
    );

    if (!matchingStockItem) {
      missingItems.push(listItem.name);
      continue;
    }

    foundItems.push({
      name: listItem.name,
      quantity: listItem.quantity,
      unitPrice: matchingStockItem.price,
      totalPrice: matchingStockItem.price * listItem.quantity,
    });
  }

  const totalPrice = foundItems.reduce((sum, item) => {
    return sum + item.totalPrice;
  }, 0);

  return {
    store: currentStore,
    distanceMiles,
    totalPrice,
    foundItems,
    missingItems,
  };
}

export function findBestStore(currentUser: user): BestStoreResult | null {
  const evaluatedStores = stores
    .map((currentStore) => evaluateStore(currentUser, currentStore))
    .filter((result): result is BestStoreResult => result !== null);

  if (evaluatedStores.length === 0) {
    return null;
  }

  return evaluatedStores.sort((a, b) => {
    if (a.missingItems.length !== b.missingItems.length) {
      return a.missingItems.length - b.missingItems.length;
    }

    if (a.totalPrice !== b.totalPrice) {
      return a.totalPrice - b.totalPrice;
    }

    return a.distanceMiles - b.distanceMiles;
  })[0];
}