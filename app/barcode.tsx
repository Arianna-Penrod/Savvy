import { useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";

import AppLayout from "@/components/AppLayout";
import BarcodeScanner from "@/components/BarcodeScanner";
import BarcodeUpload from "@/components/BarcodeUpload";
import ProductSearchPanel from "@/components/ProductSearchPanel";
import { findCheapest } from "@/utils/priceComparison";
import { isValidBarcode } from "@/utils/barcodeValidation";
import { CheapestProduct } from "@/types/store";

async function fetchFoodNameFromBarcode(
  barcode: string
): Promise<string | null> {
  try {
    const response = await fetch(
      `https://world.openfoodfacts.org/api/v2/product/${barcode}.json`
    );

    const data = await response.json();

    return data.product?.product_name || data.product?.generic_name || null;
  } catch {
    return null;
  }
}

export default function BarcodePage() {
  const [showScanner, setShowScanner] = useState(false);
  const [searchProduct, setSearchProduct] = useState("");
  const [cheapestProduct, setCheapestProduct] =
    useState<CheapestProduct | null>(null);

  const handleSearch = () => {
    const result = findCheapest(searchProduct);
    setCheapestProduct(result);
  };

  const handleScanResult = async (barcode: string) => {
    if (!isValidBarcode(barcode)) {
      alert("Invalid barcode scanned.");
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