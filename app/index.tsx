import { useEffect, useState } from "react";
import { View, StyleSheet, Text } from "react-native";
import * as Location from "expo-location";
import StoreMap from "../components/StoreMap.web";

const EXPO_PUBLIC_GOOGLE_MAPS_KEY = "AIzaSyCnjvFaIkRg6peTExxw3ARtnD61LRFcMP4";

const GOOGLE_API_KEY = process.env.EXPO_PUBLIC_GOOGLE_MAPS_KEY;



export default function Index() {
  const [region, setRegion] = useState<any>(null);
  const [stores, setStores] = useState<any[]>([]);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  useEffect(() => {
    getUserLocation();
  }, []);

  const getUserLocation = async () => {
    let { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== "granted") {
      setErrorMsg("Permission to access location was ");
      return;
    }

    let location = await Location.getCurrentPositionAsync({});
    const userRegion = {
      latitude: location.coords.latitude,
      longitude: location.coords.longitude,
      latitudeDelta: 0.01,
      longitudeDelta: 0.01,
    };

    setRegion(userRegion);
    fetchNearbyStores(userRegion.latitude, userRegion.longitude);
  };

  const fetchNearbyStores = async (lat: number, lng: number) => {
    try {
      const response = await fetch(
        `https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${lat},${lng}&radius=2000&type=supermarket&key=${GOOGLE_API_KEY}`
      );
      const data = await response.json();
      setStores(data.results || []);
    } catch (error) {
      console.log("Error fetching stores:", error);
    }
  };

  if (errorMsg) {
    return (
      <View style={styles.center}>
        <Text>{errorMsg}</Text>
      </View>
    );
  }

  if (!region) {
    return (
      <View style={styles.center}>
        <Text>Loading map...</Text>
      </View>
    );
  }

  // On native: shows real map. On web: shows fallback component.
  return <StoreMap region={region} stores={stores} />;
}

const styles = StyleSheet.create({
  center: { flex: 1, justifyContent: "center", alignItems: "center" },
});