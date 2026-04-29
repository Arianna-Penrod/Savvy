import { useState } from "react";
import * as Location from "expo-location";
import { Region } from "../types/store";

export function useUserLocation() {
  const [region, setRegion] = useState<Region | null>(null);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const requestLocation = async () => {
    try {
      setLoading(true);
      setErrorMsg(null);

      const { status } = await Location.requestForegroundPermissionsAsync();

      if (status !== "granted") {
        setErrorMsg("Permission to access location was denied");
        return;
      }

      const location = await Location.getCurrentPositionAsync({});

      setRegion({
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
        latitudeDelta: 0.01,
        longitudeDelta: 0.01,
      });
    } catch (error) {
      console.log(error);
      setErrorMsg("Failed to get location");
    } finally {
      setLoading(false);
    }
  };

  return { region, errorMsg, loading, requestLocation };
}