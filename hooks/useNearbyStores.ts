import { useEffect, useState } from "react";
import { Region, Store } from "@/types/store";
import { fetchNearbyStores } from "@/services/places";

export function useNearbyStores(region: Region | null) {
  const [stores, setStores] = useState<Store[]>([]);
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  useEffect(() => {
    if (!region) return;

    const loadStores = async () => {
      try {
        setLoading(true);
        const results = await fetchNearbyStores(region.latitude, region.longitude);
        setStores(results);
      } catch (error) {
        console.log(error);
        setErrorMsg("Failed to load nearby stores");
      } finally {
        setLoading(false);
      }
    };

    loadStores();
  }, [region]);

  return { stores, loading, errorMsg };
}