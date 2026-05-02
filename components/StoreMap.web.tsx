import { View, Text, StyleSheet } from "react-native";

type StoreMapProps = {
  region: {
    latitude: number;
    longitude: number;
    latitudeDelta: number;
    longitudeDelta: number;
  };
  stores: any[];
};

export default function StoreMap({ region, stores }: StoreMapProps) {
  return (
    <View style={styles.container}>
      <View style={styles.mapPlaceholder}>
        <Text style={styles.mapIcon}>🗺️</Text>
        <Text style={styles.title}>Map Preview</Text>

        <Text style={styles.locationText}>
          Your location: {region.latitude.toFixed(4)},{" "}
          {region.longitude.toFixed(4)}
        </Text>
      </View>

      <View style={styles.storeList}>
        <Text style={styles.sectionTitle}>Nearby Stores</Text>

        {stores.length === 0 ? (
          <Text style={styles.emptyText}>No stores found yet.</Text>
        ) : (
          stores.map((store, index) => (
            <View key={index} style={styles.storeRow}>
              <View style={styles.storeDot} />
              <Text style={styles.storeName}>{store.name}</Text>
            </View>
          ))
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#ffffff",
    borderRadius: 18,
    overflow: "hidden",
    borderWidth: 1,
    borderColor: "#dbeafe",
  },
  mapPlaceholder: {
    minHeight: 210,
    backgroundColor: "#eff6ff",
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: "#dbeafe",
  },
  mapIcon: {
    fontSize: 42,
    marginBottom: 8,
  },
  title: {
    fontSize: 22,
    fontWeight: "900",
    color: "#1d4ed8",
    marginBottom: 6,
  },
  locationText: {
    color: "#475569",
    fontWeight: "700",
    textAlign: "center",
  },
  storeList: {
    padding: 16,
  },
  sectionTitle: {
    fontSize: 17,
    fontWeight: "900",
    color: "#0f172a",
    marginBottom: 10,
  },
  emptyText: {
    color: "#64748b",
    fontWeight: "700",
  },
  storeRow: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 7,
  },
  storeDot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: "#2563eb",
    marginRight: 10,
  },
  storeName: {
    color: "#334155",
    fontWeight: "700",
  },
});