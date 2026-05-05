import { useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";

import AppLayout from "@/components/AppLayout";
import BarcodeScanner from "@/components/BarcodeScanner";
import BarcodeUpload from "@/components/BarcodeUpload";
import ProductSearchPanel from "@/components/ProductSearchPanel";
import { findCheapest } from "@/utils/priceComparison";
import { isValidBarcode } from "@/utils/barcodeValidation";
import { CheapestProduct } from "@/types/store";

async function fetchFoodNameFromBarcode( // Fetch the name of a food item from its barcode
  barcode: string // The barcode to search for
): Promise<string | null> {
  try {
    const response = await fetch(
      `https://world.openfoodfacts.org/api/v2/product/${barcode}.json` // Fetch the product data from Open Food Facts
    );

    const data = await response.json(); // Parse the JSON response

    return data.product?.product_name || data.product?.generic_name || null; // Return the product name or generic name, or null if not found
  } catch {
    return null; // Return null if there's an error
  }
}

export default function BarcodePage() {
  const [showScanner, setShowScanner] = useState(false); // Whether to show the barcode scanner
  const [searchProduct, setSearchProduct] = useState(""); // The product to search for
  const [cheapestProduct, setCheapestProduct] = 
    useState<CheapestProduct | null>(null); // The cheapest product found

  const handleSearch = () => {
    const result = findCheapest(searchProduct);
    setCheapestProduct(result); // Update the state with the cheapest product
  };

  const handleScanResult = async (barcode: string) => {
    if (!isValidBarcode(barcode)) {
      alert("Invalid barcode scanned."); // Alert the user that the scanned barcode is invalid
      return;
    }

    const foodName = await fetchFoodNameFromBarcode(barcode);
    const searchValue = foodName || barcode;

    setShowScanner(false);
    setSearchProduct(searchValue);

    const result = findCheapest(searchValue);
    setCheapestProduct(result);
  };

  return (
    <AppLayout title="Barcode Search">
      <View style={styles.card}>
        <Text style={styles.description}>
          Scan a product barcode or upload a barcode image to search for a
          matching product.
        </Text>

        <TouchableOpacity
          style={styles.button}
          onPress={() => setShowScanner(true)}
        >
          <Text style={styles.buttonText}>Scan Barcode</Text>
        </TouchableOpacity>

        <BarcodeUpload onScan={handleScanResult} />
      </View>

      {showScanner && (
        <View style={styles.card}>
          <BarcodeScanner
            onScan={handleScanResult}
            onClose={() => setShowScanner(false)}
          />
        </View>
      )}

      <View style={styles.card}>
        <ProductSearchPanel
          searchProduct={searchProduct}
          onChangeSearch={setSearchProduct}
          onSearch={handleSearch}
          result={cheapestProduct}
        />
      </View>
    </AppLayout>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#ffffff",
    padding: 18,
    borderRadius: 22,
    marginBottom: 18,
    borderWidth: 1,
    borderColor: "#dbeafe",
    shadowColor: "#000000",
    shadowOpacity: 0.06,
    shadowRadius: 10,
    elevation: 2,
  },
  description: {
    fontSize: 15,
    lineHeight: 22,
    color: "#64748b",
    marginBottom: 14,
  },
  button: {
    backgroundColor: "#2563eb",
    padding: 14,
    borderRadius: 14,
    marginBottom: 10,
  },
  buttonText: {
    color: "#ffffff",
    fontWeight: "900",
    textAlign: "center",
  },
});