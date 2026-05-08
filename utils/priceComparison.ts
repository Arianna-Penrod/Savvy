// Imports the demo product list that contains product names and store prices.
import { demoProducts } from "@/data/demoProducts";

// Finds the cheapest store price for the product name the user searched.
export function findCheapest(productName: string) {
  
  // Searches the demo product list for a product with the same name as the input.
  const product = demoProducts.find(
    // Converts both names to lowercase so the search is not case-sensitive.
    (p) => p.name.toLowerCase() === productName.toLowerCase()
  );
  
  // If no matching product is found, return null so the app knows there is no result.
  if (!product) return null;

  // Starts by assuming the first store price is the cheapest.
  let cheapest = product.prices[0];
  
  // Loops through every store price for the matching product.
  for (let price of product.prices) {
    // If this store's price is lower than the current, it updates.
    if (price.price < cheapest.price) {
      cheapest = price;
    }
  }
  // Returns the cheapest store and price found.
  return cheapest;
}
