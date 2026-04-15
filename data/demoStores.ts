import { Double } from "react-native/Libraries/Types/CodegenTypes";

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
  name: string;
  stock: StockItem[];
  location: StoreLocation;
};

export const stores: store[] = [
    {
        name: "Walmart", // the store name
        stock: [
            { name: "Apples", price: 2, inStock: true },
            { name: "Milk", price: 1, inStock: true }
        ],
        location: { lat: 0, long: 0 }
    }
];