import { useMemo, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
} from "react-native";

import AppLayout from "@/components/AppLayout";
import LocationPermissionModal from "@/components/LocationPerms";
import ScreenMessage from "@/components/ScreenMessage";
import StoreMap from "@/components/StoreMap.web";
import { useUserLocation } from "@/hooks/useUserLocation";
import { useNearbyStores } from "@/hooks/useNearbyStores";

function getDistanceMiles(
  lat1: number,
  lon1: number,
  lat2: number,
  lon2: number
) {
  const earthRadiusMiles = 3958.8;

  const dLat = ((lat2 - lat1) * Math.PI) / 180;
  const dLon = ((lon2 - lon1) * Math.PI) / 180;

  const a =
    Math.sin(dLat / 2) ** 2 +
    Math.cos((lat1 * Math.PI) / 180) *
      Math.cos((lat2 * Math.PI) / 180) *
      Math.sin(dLon / 2) ** 2;

  return earthRadiusMiles * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
}

export default function Landing() {
  const [showLocationModal, setShowLocationModal] = useState(true);

  const {
    region,
    errorMsg: locationError,
    loading: locationLoading,
    requestLocation,
  } = useUserLocation();

  const {
    stores,
    loading: storesLoading,
    errorMsg: storesError,
  } = useNearbyStores(region);

  const closestStore = useMemo(() => {
    if (!region || stores.length === 0) {
      return null;
    }

    return stores
      .map((store) => ({
        ...store,
        distance: getDistanceMiles(
          region.latitude,
          region.longitude,
          store.geometry.location.lat,
          store.geometry.location.lng
        ),
      }))
      .sort((a, b) => a.distance - b.distance)[0];
  }, [region, stores]);

  const handleAllowLocation = async () => {
    setShowLocationModal(false);
    await requestLocation();
  };

  return (
    <AppLayout title="Welcome back!">
      <LocationPermissionModal
        visible={showLocationModal}
        onAllow={handleAllowLocation}
        onNotNow={() => setShowLocationModal(false)}
      />

      <View style={styles.card}>
        <Text style={styles.heading}>Let&apos;s find your closest store.</Text>

        <Text style={styles.paragraph}>
          Savvy can use your location to find nearby grocery stores and help you
          compare prices for the items you need.
        </Text>

        {!region && (
          <TouchableOpacity style={styles.button} onPress={handleAllowLocation}>
            <Text style={styles.buttonText}>Find stores near me</Text>
          </TouchableOpacity>
        )}
      </View>

      {locationError && (
        <View style={styles.card}>
          <ScreenMessage message={locationError} />
        </View>
      )}

      {storesError && (
        <View style={styles.card}>
          <ScreenMessage message={storesError} />
        </View>
      )}

      {(locationLoading || storesLoading) && (
        <View style={styles.card}>
          <Text style={styles.paragraph}>Loading nearby stores...</Text>
        </View>
      )}

      {closestStore && (
        <View style={styles.card}>
          <Text style={styles.sectionTitle}>Closest Store</Text>

          <Text style={styles.storeName}>{closestStore.name}</Text>

          <Text style={styles.paragraph}>
            About {closestStore.distance.toFixed(2)} miles away
          </Text>
        </View>
      )}

      {region && (
        <View style={styles.card}>
          <Text style={styles.sectionTitle}>Stores Near You</Text>

          <View style={styles.mapBox}>
            <StoreMap region={region} stores={stores} />
          </View>
        </View>
      )}
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
  heading: {
    fontSize: 22,
    fontWeight: "900",
    color: "#1d4ed8",
    marginBottom: 8,
  },
  sectionTitle: {
    fontSize: 19,
    fontWeight: "900",
    color: "#1d4ed8",
    marginBottom: 8,
  },
  paragraph: {
    fontSize: 15,
    lineHeight: 22,
    color: "#64748b",
  },
  storeName: {
    fontSize: 18,
    fontWeight: "800",
    color: "#0f172a",
    marginBottom: 4,
  },
  button: {
    marginTop: 16,
    backgroundColor: "#2563eb",
    padding: 14,
    borderRadius: 14,
  },
  buttonText: {
    color: "#ffffff",
    fontWeight: "900",
    textAlign: "center",
  },
  mapBox: {
    height: 380,
    borderRadius: 16,
    overflow: "hidden",
    marginTop: 10,
  },
});