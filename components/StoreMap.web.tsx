import { View, Text } from "react-native";

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
    <View>
      <Text>Map Placeholder (Web)</Text>

      <Text>
        User Location: {region.latitude}, {region.longitude}
      </Text>

      <Text>Nearby Stores:</Text>

      {stores.map((store, index) => (
        <Text key={index}>{store.name}</Text>
      ))}
    </View>
  );
}

/*
export default function StoreMapWeb() {
    return (
        <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
            <Text>Maps.</Text>
        </View>
    );
}
 */