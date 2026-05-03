export type StockItem = {
  name: string;
  price: number;
  inStock: boolean;
};

export type StoreLocation = {
  lat: number;
  long: number;
};

export type store = {
  id: string;
  name: string;
  address: string;
  distanceMiles: number;
  rating: number;
  location: StoreLocation;
  stock: StockItem[];
};

export const stores: store[] = [
  {
    id: "store-1",
    name: "Demo Walmart",
    address: "1200 Demo Drive, Norman, OK",
    distanceMiles: 1.2,
    rating: 4.1,
    location: {
      lat: 35.2226,
      long: -97.4395,
    },
    stock: [
      { name: "Milk", price: 3.49, inStock: true },
      { name: "Eggs", price: 2.99, inStock: true },
      { name: "Bread", price: 2.49, inStock: true },
      { name: "Apples", price: 4.25, inStock: true },
      { name: "Bananas", price: 1.69, inStock: true },
      { name: "Chicken Breast", price: 8.99, inStock: true },
      { name: "Ground Beef", price: 6.99, inStock: false },
      { name: "Rice", price: 4.99, inStock: true },
      { name: "Pasta", price: 1.29, inStock: true },
      { name: "Cereal", price: 3.99, inStock: true },
      { name: "Coffee", price: 7.99, inStock: true },
      { name: "Toilet Paper", price: 9.99, inStock: true },
    ],
  },
  {
    id: "store-2",
    name: "Demo Target",
    address: "4500 Savings Ave, Norman, OK",
    distanceMiles: 2.4,
    rating: 4.3,
    location: {
      lat: 35.2142,
      long: -97.4457,
    },
    stock: [
      { name: "Milk", price: 3.89, inStock: true },
      { name: "Eggs", price: 3.49, inStock: true },
      { name: "Bread", price: 2.29, inStock: true },
      { name: "Apples", price: 4.79, inStock: true },
      { name: "Bananas", price: 1.89, inStock: true },
      { name: "Chicken Breast", price: 9.79, inStock: true },
      { name: "Ground Beef", price: 7.49, inStock: true },
      { name: "Rice", price: 5.49, inStock: true },
      { name: "Pasta", price: 1.49, inStock: true },
      { name: "Cereal", price: 4.29, inStock: true },
      { name: "Coffee", price: 8.49, inStock: true },
      { name: "Toilet Paper", price: 10.49, inStock: true },
    ],
  },
  {
    id: "store-3",
    name: "Demo Aldi",
    address: "800 Budget Blvd, Norman, OK",
    distanceMiles: 3.1,
    rating: 4.4,
    location: {
      lat: 35.2301,
      long: -97.4632,
    },
    stock: [
      { name: "Milk", price: 3.59, inStock: true },
      { name: "Eggs", price: 3.19, inStock: true },
      { name: "Bread", price: 2.39, inStock: true },
      { name: "Apples", price: 3.99, inStock: true },
      { name: "Bananas", price: 1.49, inStock: true },
      { name: "Chicken Breast", price: 8.49, inStock: true },
      { name: "Ground Beef", price: 6.59, inStock: true },
      { name: "Rice", price: 4.79, inStock: true },
      { name: "Pasta", price: 1.19, inStock: true },
      { name: "Cereal", price: 3.59, inStock: true },
      { name: "Coffee", price: 7.49, inStock: true },
      { name: "Toilet Paper", price: 9.79, inStock: false },
    ],
  },
  {
    id: "store-4",
    name: "Demo Kroger",
    address: "610 Grocery Lane, Norman, OK",
    distanceMiles: 4.0,
    rating: 4.2,
    location: {
      lat: 35.2068,
      long: -97.4303,
    },
    stock: [
      { name: "Milk", price: 3.79, inStock: true },
      { name: "Eggs", price: 3.39, inStock: true },
      { name: "Bread", price: 2.59, inStock: true },
      { name: "Apples", price: 4.49, inStock: true },
      { name: "Bananas", price: 1.79, inStock: true },
      { name: "Chicken Breast", price: 9.29, inStock: false },
      { name: "Ground Beef", price: 7.19, inStock: true },
      { name: "Rice", price: 5.19, inStock: true },
      { name: "Pasta", price: 1.39, inStock: true },
      { name: "Cereal", price: 4.09, inStock: true },
      { name: "Coffee", price: 8.29, inStock: true },
      { name: "Toilet Paper", price: 10.29, inStock: true },
    ],
  },
];