import { useEffect, useState } from "react";
import { View, StyleSheet, Text } from "react-native";
import MapView, { Marker } from "react-native-maps";
import * as Location from "expo-location";

const EXPO_PUBLIC_GOOGLE_MAPS_KEY= "AIzaSyCnjvFaIkRg6peTExxw3ARtnD61LRFcMP4";

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
      setErrorMsg("Permission to access location was denied");
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

  return (
    <MapView style={styles.map} region={region}>
      {/* User Marker */}
      <Marker coordinate={region} title="You are here" pinColor="blue" />

      {/* Store Markers */}
      {stores.map((store, index) => (
        <Marker
          key={index}
          coordinate={{
            latitude: store.geometry.location.lat,
            longitude: store.geometry.location.lng,
          }}
          title={store.name}
        />
      ))}
    </MapView>
  );
}

const styles = StyleSheet.create({
  map: {
    flex: 1,
  },
  center: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});


/*
async function getNearbyStores(lat, lng) {
  const url = `https://maps.googleapis.com/maps/api/place/nearbysearch/json
  ?location=${lat},${lng}
  &radius=2000
  &type=supermarket
  &key=${GOOGLE_API_KEY}`;

  const res = await fetch(url);
  const data = await res.json();
  return data.results;
}

export default function Index() {
  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Text>This will be the landing page of our app! Yippee</Text>
      <Text>Will this work idkkkk</Text>
      <View style={{ height: 20 }} />
      <Text>
        This can be the page that shows the user a list of items near them?
      </Text>
    </View>
  );

}
  */

