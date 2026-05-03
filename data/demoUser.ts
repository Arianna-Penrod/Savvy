export type ShoppingListItem = {
  name: string;
  quantity: number;
};

export type UserLocation = {
  lat: number;
  long: number;
};

export type user = {
  userID: string;
  name: string;
  email: string;
  list: ShoppingListItem[];
  location: UserLocation;
  radiusMiles: number;
  favoriteStores: string[];
};

export const users: user[] = [
  {
    userID: "1",
    name: "Arianna",
    email: "test@test.com",
    list: [
      { name: "Apples", quantity: 2 },
      { name: "Milk", quantity: 1 },
      { name: "Bread", quantity: 1 },
      { name: "Eggs", quantity: 1 },
    ],
    location: {
      lat: 35.2226,
      long: -97.4395,
    },
    radiusMiles: 10,
    favoriteStores: ["Demo Walmart", "Demo Target"],
  },
  {
    userID: "2",
    name: "Demo User",
    email: "demo@savvy.com",
    list: [
      { name: "Chicken Breast", quantity: 2 },
      { name: "Rice", quantity: 1 },
      { name: "Pasta", quantity: 3 },
      { name: "Coffee", quantity: 1 },
    ],
    location: {
      lat: 35.2142,
      long: -97.4457,
    },
    radiusMiles: 8,
    favoriteStores: ["Demo Aldi", "Demo Kroger"],
  },
];