export type ProductPrice = {
  store: string;
  price: number;
};

export type DemoProduct = {
  name: string;
  category: string;
  barcode?: string;
  prices: ProductPrice[];
};

export const demoProducts: DemoProduct[] = [
  {
    name: "Milk",
    category: "Dairy",
    barcode: "012345678905",
    prices: [
      { store: "Demo Walmart", price: 3.49 },
      { store: "Demo Target", price: 3.89 },
      { store: "Demo Aldi", price: 3.59 },
      { store: "Demo Kroger", price: 3.79 },
    ],
  },
  {
    name: "Eggs",
    category: "Dairy",
    barcode: "036000291452",
    prices: [
      { store: "Demo Walmart", price: 2.99 },
      { store: "Demo Target", price: 3.49 },
      { store: "Demo Aldi", price: 3.19 },
      { store: "Demo Kroger", price: 3.39 },
    ],
  },
  {
    name: "Bread",
    category: "Bakery",
    barcode: "041383090013",
    prices: [
      { store: "Demo Walmart", price: 2.49 },
      { store: "Demo Target", price: 2.29 },
      { store: "Demo Aldi", price: 2.39 },
      { store: "Demo Kroger", price: 2.59 },
    ],
  },
  {
    name: "Apples",
    category: "Produce",
    prices: [
      { store: "Demo Walmart", price: 4.25 },
      { store: "Demo Target", price: 4.79 },
      { store: "Demo Aldi", price: 3.99 },
      { store: "Demo Kroger", price: 4.49 },
    ],
  },
  {
    name: "Bananas",
    category: "Produce",
    prices: [
      { store: "Demo Walmart", price: 1.69 },
      { store: "Demo Target", price: 1.89 },
      { store: "Demo Aldi", price: 1.49 },
      { store: "Demo Kroger", price: 1.79 },
    ],
  },
  {
    name: "Chicken Breast",
    category: "Meat",
    prices: [
      { store: "Demo Walmart", price: 8.99 },
      { store: "Demo Target", price: 9.79 },
      { store: "Demo Aldi", price: 8.49 },
      { store: "Demo Kroger", price: 9.29 },
    ],
  },
  {
    name: "Ground Beef",
    category: "Meat",
    prices: [
      { store: "Demo Walmart", price: 6.99 },
      { store: "Demo Target", price: 7.49 },
      { store: "Demo Aldi", price: 6.59 },
      { store: "Demo Kroger", price: 7.19 },
    ],
  },
  {
    name: "Rice",
    category: "Pantry",
    prices: [
      { store: "Demo Walmart", price: 4.99 },
      { store: "Demo Target", price: 5.49 },
      { store: "Demo Aldi", price: 4.79 },
      { store: "Demo Kroger", price: 5.19 },
    ],
  },
  {
    name: "Pasta",
    category: "Pantry",
    prices: [
      { store: "Demo Walmart", price: 1.29 },
      { store: "Demo Target", price: 1.49 },
      { store: "Demo Aldi", price: 1.19 },
      { store: "Demo Kroger", price: 1.39 },
    ],
  },
  {
    name: "Cereal",
    category: "Breakfast",
    prices: [
      { store: "Demo Walmart", price: 3.99 },
      { store: "Demo Target", price: 4.29 },
      { store: "Demo Aldi", price: 3.59 },
      { store: "Demo Kroger", price: 4.09 },
    ],
  },
  {
    name: "Coffee",
    category: "Drinks",
    prices: [
      { store: "Demo Walmart", price: 7.99 },
      { store: "Demo Target", price: 8.49 },
      { store: "Demo Aldi", price: 7.49 },
      { store: "Demo Kroger", price: 8.29 },
    ],
  },
  {
    name: "Toilet Paper",
    category: "Household",
    prices: [
      { store: "Demo Walmart", price: 9.99 },
      { store: "Demo Target", price: 10.49 },
      { store: "Demo Aldi", price: 9.79 },
      { store: "Demo Kroger", price: 10.29 },
    ],
  },
];