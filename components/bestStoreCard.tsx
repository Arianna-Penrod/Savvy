import { View, Text, StyleSheet } from "react-native";
import { BestStoreResult } from "@/utils/bestStore";

type Props = {
  // this prop contains the calculated best store result, or null when no nearby store matches the user's shopping list.
  bestStore: BestStoreResult | null;
};

export default function BestStoreCard({ bestStore }: Props) {
  // when the best store finder cannot return a store, this early return keeps the card visible and explains the empty result to the user.
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
      {/* this header introduces the recommendation so the user understands that the following store is the best match for their list. */}
      <Text style={styles.sectionTitle}>Best Store for Your List</Text>

      {/* this store name is emphasized because it is the main answer the card is giving the user. */}
      <Text style={styles.storeName}>{bestStore.store.name}</Text>

      {/* this total price formats the combined cost of all found list items to exactly two decimal places for currency display. */}
      <Text style={styles.text}>
        Total price: ${bestStore.totalPrice.toFixed(2)}
      </Text>

      {/* this distance line shows how far away the recommended store is, rounded to two decimal places so the value stays readable. */}
      <Text style={styles.text}>
        Distance: {bestStore.distanceMiles.toFixed(2)} miles
      </Text>

      {/* this divider separates the store summary from the item-by-item breakdown below it. */}
      <View style={styles.divider} />

      {/* this list shows every item the store can fulfill, including the requested quantity and the calculated total for that item. */}
      {bestStore.foundItems.map((item) => (
        <Text key={item.name} style={styles.itemText}>
          {item.quantity} × {item.name}: ${item.totalPrice.toFixed(2)}
        </Text>
      ))}

      {/* this warning only appears when one or more requested items were not found at the recommended store. */}
      {bestStore.missingItems.length > 0 && (
        <Text style={styles.warningText}>
          Missing: {bestStore.missingItems.join(", ")}
        </Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  // this card style creates the outer container, including spacing, rounded corners, border, and shadow so the recommendation stands apart from the page.
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
  // this title style makes the section label prominent while keeping it smaller than the actual store name.
  sectionTitle: {
    fontSize: 19,
    fontWeight: "900",
    color: "#1d4ed8",
    marginBottom: 8,
  },
  // this store name style is the strongest text treatment because it is the primary recommendation in the card.
  storeName: {
    fontSize: 22,
    fontWeight: "900",
    color: "#0f172a",
    marginBottom: 8,
  },
  // this shared text style is used for supporting details like total price and distance, with a softer color and comfortable line height.
  text: {
    fontSize: 15,
    lineHeight: 22,
    color: "#64748b",
    marginBottom: 4,
  },
  // this item text style gives each matched grocery item enough weight to scan clearly in the breakdown list.
  itemText: {
    fontSize: 15,
    color: "#0f172a",
    fontWeight: "700",
    marginBottom: 4,
  },
  // this warning style uses red text and a pale red background to make missing items noticeable without taking over the whole card.
  warningText: {
    marginTop: 10,
    color: "#b91c1c",
    backgroundColor: "#fee2e2",
    padding: 10,
    borderRadius: 12,
    fontWeight: "800",
  },
  // this divider style adds a thin horizontal rule between the high-level store information and the detailed item list.
  divider: {
    height: 1,
    backgroundColor: "#dbeafe",
    marginVertical: 12,
  },
});
