import { View, Text, StyleSheet } from "react-native";
import { BestStoreResult } from "@/utils/bestStore";

type Props = {
  bestStore: BestStoreResult | null;
};

export default function BestStoreCard({ bestStore }: Props) {
  if (!bestStore) {
    return (
      <View style={styles.card}>
        <Text style={styles.sectionTitle}>No Best Store Found</Text>
        <Text style={styles.text}>
          No stores within your radius had matching items.
        </Text>
      </View>
    );
  }

  return (
    <View style={styles.card}>
      <Text style={styles.sectionTitle}>Best Store for Your List</Text>
      <Text style={styles.storeName}>{bestStore.store.name}</Text>

      <Text style={styles.text}>
        Total price: ${bestStore.totalPrice.toFixed(2)}
      </Text>

      <Text style={styles.text}>
        Distance: {bestStore.distanceMiles.toFixed(2)} miles
      </Text>

      <View style={styles.divider} />

      {bestStore.foundItems.map((item) => (
        <Text key={item.name} style={styles.itemText}>
          {item.quantity} × {item.name}: ${item.totalPrice.toFixed(2)}
        </Text>
      ))}

      {bestStore.missingItems.length > 0 && (
        <Text style={styles.warningText}>
          Missing: {bestStore.missingItems.join(", ")}
        </Text>
      )}
    </View>
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
  sectionTitle: {
    fontSize: 19,
    fontWeight: "900",
    color: "#1d4ed8",
    marginBottom: 8,
  },
  storeName: {
    fontSize: 22,
    fontWeight: "900",
    color: "#0f172a",
    marginBottom: 8,
  },
  text: {
    fontSize: 15,
    lineHeight: 22,
    color: "#64748b",
    marginBottom: 4,
  },
  itemText: {
    fontSize: 15,
    color: "#0f172a",
    fontWeight: "700",
    marginBottom: 4,
  },
  warningText: {
    marginTop: 10,
    color: "#b91c1c",
    backgroundColor: "#fee2e2",
    padding: 10,
    borderRadius: 12,
    fontWeight: "800",
  },
  divider: {
    height: 1,
    backgroundColor: "#dbeafe",
    marginVertical: 12,
  },
});
