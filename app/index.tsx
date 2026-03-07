import { useEffect, useState } from "react";
import {
  View,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  Platform
} from "react-native";
import * as Location from "expo-location";
import StoreMap from "../components/StoreMap.web";
import { findCheapest } from "@/utils/priceComparison";


const EXPO_PUBLIC_GOOGLE_MAPS_KEY = "AIzaSyCnjvFaIkRg6peTExxw3ARtnD61LRFcMP4";

const GOOGLE_API_KEY = EXPO_PUBLIC_GOOGLE_MAPS_KEY;

export default function Index() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loginError, setLoginError] = useState("");

  const [region, setRegion] = useState<any>(null);
  const [stores, setStores] = useState<any[]>([]);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  // PRODUCT SEARCH STATES
  const [searchProduct, setSearchProduct] = useState("");
  const [cheapestProduct, setCheapestProduct] = useState<any>(null);

  useEffect(() => {
    if (isLoggedIn) {
      getUserLocation();
    }
  }, [isLoggedIn]);

  const handleLogin = () => {
    // Temporary fake login logic
    // Replace this later with Firebase, Supabase, your backend, etc.
    if (email.trim() === "test@test.com" && password === "12345") {
      setLoginError("");
      setIsLoggedIn(true);
    } else {
      setLoginError("Invalid email or password");
    }
  };

  const getUserLocation = async () => {
    try{
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
  }
  catch (err) {
    console.log(err);
    setErrorMsg("Failed to get location");
  }
  };

  const fetchNearbyStores = async (lat: number, lng: number) => {
   // Web fallback because Google blocks browser requests
    if (Platform.OS === "web") {
      setStores([
        {
          name: "Demo Walmart",
          geometry: { location: { lat: lat + 0.002, lng: lng + 0.002 } },
        },
        {
          name: "Demo Target",
          geometry: { location: { lat: lat - 0.002, lng: lng - 0.002 } },
        },
      ]);
      return;
    }
   
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

  // LOGIN SCREEN
  if (!isLoggedIn) {
    return (
      <View style={styles.loginContainer}>
        <Text style={styles.title}>Login</Text>

        <TextInput
          style={styles.input}
          placeholder="Email"
          value={email}
          onChangeText={setEmail}
          autoCapitalize="none"
        />

        <TextInput
          style={styles.input}
          placeholder="Password"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
        />

        {loginError ? <Text style={styles.error}>{loginError}</Text> : null}

        <TouchableOpacity style={styles.button} onPress={handleLogin}>
          <Text style={styles.buttonText}>Sign In</Text>
        </TouchableOpacity>
      </View>
    );
  }

  // MAP ERRORS
  if (errorMsg) {
    return (
      <View style={styles.center}>
        <Text>{errorMsg}</Text>
      </View>
    );
  }

  // MAP LOADING
  if (!region) {
    return (
      <View style={styles.center}>
        <Text>Loading map...</Text>
      </View>
    );
  }

  // MAP SCREEN
  return <StoreMap region={region} stores={stores} />;
}

const styles = StyleSheet.create({
  center: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  loginContainer: {
    flex: 1,
    justifyContent: "center",
    paddingHorizontal: 24,
    backgroundColor: "#fff",
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    marginBottom: 24,
    textAlign: "center",
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    padding: 12,
    marginBottom: 12,
  },
  button: {
    backgroundColor: "#007AFF",
    padding: 14,
    borderRadius: 8,
    marginTop: 8,
  },
  buttonText: {
    color: "#fff",
    textAlign: "center",
    fontWeight: "bold",
  },
  error: {
    color: "red",
    marginBottom: 10,
    textAlign: "center",
  },
});