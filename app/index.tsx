import { useState } from "react";
import { View, Button } from "react-native";
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
import { CheapestProduct } from "@/types/store";

export default function Index() {
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

  const handleScanResult = (barcode: string) => {
    if (!isValidBarcode(barcode)) { // validate barcode format
      alert("Invalid barcode scanned."); // show error message to user
      return;
    }
    setSearchProduct(barcode);
    setShowScanner(false);

    const result = findCheapest(barcode);
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
    <View style={{ flex: 1 }}>
      <LocationPermissionModal
        visible={showLocationModal}
        onAllow={handleAllowLocation}
        onNotNow={() => setShowLocationModal(false)}
      />

      <ProductSearchPanel
        searchProduct={searchProduct}
        onChangeSearch={setSearchProduct}
        onSearch={handleSearch}
        result={cheapestProduct}
      />

      <View style={{ padding: 10 }}>
        <Button title="Scan Barcode" onPress={() => setShowScanner(true)} />
      </View>

      {showScanner && (
        <BarcodeScanner
          onScan={handleScanResult}
          onClose={() => setShowScanner(false)}
        />
      )}

      {region ? (
        <View style={{ flex: 1 }}>
          <StoreMap region={region} stores={stores} />
        </View>
      ) : (
        <ScreenMessage message="Enable location to see nearby stores." />
      )}
    </View>
  );
}