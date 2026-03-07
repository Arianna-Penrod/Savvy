import { demoProducts } from "@/data/demoProducts";

export function findCheapest(productName: string) {
  const product = demoProducts.find(
    (p) => p.name.toLowerCase() === productName.toLowerCase()
  );

  if (!product) return null;

  let cheapest = product.prices[0];

  for (let price of product.prices) {
    if (price.price < cheapest.price) {
      cheapest = price;
    }
  }

  return cheapest;
}