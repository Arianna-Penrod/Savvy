import { useState } from "react";
import { View, Button, ScrollView } from "react-native";
import StoreMap from "../components/StoreMap.web";
import LoginForm from "@/components/LoginForm";
import ProductSearchPanel from "@/components/ProductSearchPanel";
import ScreenMessage from "@/components/ScreenMessage";
import LocationPermissionModal from "@/components/LocationPerms";
import BarcodeScanner from "@/components/BarcodeScanner";
import { useUserLocation } from "@/hooks/useUserLocation";
import { useNearbyStores } from "@/hooks/useNearbyStores";
import { findCheapest } from "@/utils/priceComparison";
import { isValidBarcode } from "../utils/barcodeValidation";
import BarcodeUpload from "@/components/BarcodeUpload";
import { CheapestProduct } from "@/types/store";
import UserProfileManager from "@/components/UserProfileManager";
import { users } from "@/data/demoUser";

// helper function to fetch food name from barcode using OpenFoodFacts API, I couldn't get it to export correctly from services
async function fetchFoodNameFromBarcode(
  barcode: string
): Promise<string | null> {
  try {
    const response = await fetch(
      `https://world.openfoodfacts.org/api/v2/product/${barcode}.json`
    );

    const data = await response.json();

    return data.product?.product_name || data.product?.generic_name || null;
  } catch {
    return null;
  }
}

export default function Index() {

  const [currentUser, setCurrentUser] = useState(users[0]);
  
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showLocationModal, setShowLocationModal] = useState(false);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loginError, setLoginError] = useState("");

  const [searchProduct, setSearchProduct] = useState("");
  const [cheapestProduct, setCheapestProduct] =
    useState<CheapestProduct | null>(null);

  const {
    region,
    errorMsg: locationError,
    loading: locationLoading,
    requestLocation,
  } = useUserLocation();

  const [showScanner, setShowScanner] = useState(false);

  const { stores, errorMsg: storesError } = useNearbyStores(region);

  const handleLogin = () => {
    if (email.trim() === "test@test.com" && password === "123456") {
      setLoginError("");
      setIsLoggedIn(true);
      setShowLocationModal(true);
    } else {
      setLoginError("Invalid email or password");
    }
  };

  const handleAllowLocation = async () => {
    setShowLocationModal(false);
    await requestLocation();
  };

  const handleSearch = () => {
    const result = findCheapest(searchProduct);
    setCheapestProduct(result);
  };

  const handleScanResult = async (barcode: string) => {
  if (!isValidBarcode(barcode)) { // validate barcode format before processing
    alert("Invalid barcode scanned.");
    return;
  }
  const foodName = await fetchFoodNameFromBarcode(barcode); // fetch food name from barcode
  const searchValue = foodName || barcode; // if food name found, use it for search, otherwise fallback to barcode
  setShowScanner(false); // close scanner after successful scan
  setSearchProduct(foodName || barcode); // update search input with food name if available
  const result = findCheapest(searchValue);
  setCheapestProduct(result);
};

  if (!isLoggedIn) {
    return (
      <LoginForm
        email={email}
        password={password}
        error={loginError}
        onChangeEmail={setEmail}
        onChangePassword={setPassword}
        onSubmit={handleLogin}
      />
    );
  }

  if (locationError) return <ScreenMessage message={locationError} />;
  if (storesError) return <ScreenMessage message={storesError} />;

  if (locationLoading) {
    return <ScreenMessage message="Loading map..." />;
  }

  return (
    <ScrollView style={{ flex: 1 }} contentContainerStyle={{ paddingBottom: 30 }}>
      <LocationPermissionModal
        visible={showLocationModal}
        onAllow={handleAllowLocation}
        onNotNow={() => setShowLocationModal(false)}
      />

      <UserProfileManager
        currentUser={currentUser}
        onUpdate={setCurrentUser}
      />

      <ProductSearchPanel
        searchProduct={searchProduct}
        onChangeSearch={setSearchProduct}
        onSearch={handleSearch}
        result={cheapestProduct}
      />
      <View style={{ padding: 10 }}>
        <Button title="Scan Barcode" onPress={() => setShowScanner(true)} /> {/* button to open barcode scanner */}
      </View>

      <BarcodeUpload onScan={handleScanResult} />

      {showScanner && (
        <BarcodeScanner onScan={handleScanResult} onClose={() => setShowScanner(false)} /> // show scanner when button is pressed, pass handlers for scan result and closing scanner
      )}

          {locationLoading || !region ? (
      <ScreenMessage message="Loading map..." />
    ) : (
      <View style={{ height: 400 }}>
        <StoreMap region={region} stores={stores} />
      </View>
    )}

    </ScrollView>
    );
}