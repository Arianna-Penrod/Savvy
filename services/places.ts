import { Platform } from "react-native";
import { Store } from "@/types/store";

export async function fetchNearbyStores(lat: number, lng: number): Promise<Store[]> {
  if (Platform.OS === "web") {
    return [
      {
        name: "Demo Walmart",
        geometry: { location: { lat: lat + 0.002, lng: lng + 0.002 } },
      },
      {
        name: "Demo Target",
        geometry: { location: { lat: lat - 0.002, lng: lng - 0.002 } },
      },
    ];
  }

  const apiKey = process.env.EXPO_PUBLIC_GOOGLE_MAPS_KEY;
  if (!apiKey) {
    throw new Error("Missing Google Maps API key");
  }

  const response = await fetch(
    `https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${lat},${lng}&radius=2000&type=supermarket&key=${apiKey}`
  );

  const data = await response.json();
  return data.results || [];
}