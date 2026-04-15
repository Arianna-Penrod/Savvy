import { View, Text, TextInput, TouchableOpacity, StyleSheet } from "react-native";
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
      <TextInput
        style={styles.input}
        placeholder="Search product (Milk, Eggs, Bread)"
        value={searchProduct}
        onChangeText={onChangeSearch}
      />

      <TouchableOpacity style={styles.button} onPress={onSearch}>
        <Text style={styles.buttonText}>Find Cheapest</Text>
      </TouchableOpacity>

      {result && (
        <View style={styles.resultBox}>
          <Text style={styles.resultText}>Cheapest Store: {result.store}</Text>
          <Text style={styles.resultText}>Price: ${result.price}</Text>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  searchContainer: {
    padding: 16,
    backgroundColor: "#fff",
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    padding: 12,
    marginBottom: 12,
  },
  button: {
    backgroundColor: "#87b0dbff",
    padding: 14,
    borderRadius: 8,
    marginTop: 8,
  },
  buttonText: {
    color: "#fff",
    textAlign: "center",
    fontWeight: "bold",
  },
  resultBox: {
    marginTop: 10,
    padding: 10,
    backgroundColor: "#E8F4FF",
    borderRadius: 8,
  },
  resultText: {
    fontSize: 16,
    fontWeight: "500",
  },
});