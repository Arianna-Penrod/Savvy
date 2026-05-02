import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import { CheapestProduct } from "@/types/store";

type Props = {
  searchProduct: string;
  onChangeSearch: (value: string) => void;
  onSearch: () => void;
  result: CheapestProduct | null;
};

export default function ProductSearchPanel({
  searchProduct,
  onChangeSearch,
  onSearch,
  result,
}: Props) {
  return (
    <View style={styles.searchContainer}>
      <Text style={styles.title}>Product Search</Text>

      <Text style={styles.description}>
        Search for an item and Savvy will find the cheapest matching store.
      </Text>

      <TextInput
        style={styles.input}
        placeholder="Search product, like Milk, Eggs, Bread"
        placeholderTextColor="#94a3b8"
        value={searchProduct}
        onChangeText={onChangeSearch}
      />

      <TouchableOpacity style={styles.button} onPress={onSearch}>
        <Text style={styles.buttonText}>Find Cheapest</Text>
      </TouchableOpacity>

      {result && (
        <View style={styles.resultBox}>
          <Text style={styles.resultLabel}>Best match</Text>
          <Text style={styles.resultText}>Cheapest Store: {result.store}</Text>
          <Text style={styles.resultText}>Price: ${result.price}</Text>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  searchContainer: {
    padding: 18,
    backgroundColor: "#ffffff",
    borderRadius: 22,
    borderWidth: 1,
    borderColor: "#dbeafe",
    shadowColor: "#000000",
    shadowOpacity: 0.06,
    shadowRadius: 10,
    elevation: 2,
  },
  title: {
    fontSize: 20,
    fontWeight: "900",
    color: "#1d4ed8",
    marginBottom: 6,
  },
  description: {
    fontSize: 14,
    lineHeight: 21,
    color: "#64748b",
    marginBottom: 14,
  },
  input: {
    borderWidth: 1,
    borderColor: "#bfdbfe",
    backgroundColor: "#f8fbff",
    borderRadius: 14,
    paddingVertical: 13,
    paddingHorizontal: 14,
    marginBottom: 12,
    color: "#0f172a",
    fontSize: 15,
  },
  button: {
    backgroundColor: "#2563eb",
    padding: 14,
    borderRadius: 14,
    marginTop: 4,
  },
  buttonText: {
    color: "#ffffff",
    textAlign: "center",
    fontWeight: "900",
    fontSize: 15,
  },
  resultBox: {
    marginTop: 14,
    padding: 14,
    backgroundColor: "#eff6ff",
    borderRadius: 16,
    borderWidth: 1,
    borderColor: "#bfdbfe",
  },
  resultLabel: {
    color: "#1d4ed8",
    fontWeight: "900",
    marginBottom: 5,
  },
  resultText: {
    fontSize: 16,
    fontWeight: "700",
    color: "#0f172a",
    marginBottom: 3,
  },
});