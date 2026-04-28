import { useState } from "react";
import { View, Button } from "react-native";
import StoreMap from "../components/StoreMap.web";
import LoginForm from "@/components/LoginForm";
import ProductSearchPanel from "@/components/ProductSearchPanel";
import ScreenMessage from "@/components/ScreenMessage";
import BarcodeScanner from "@/components/BarcodeScanner";
import { useUserLocation } from "@/hooks/useUserLocation";
import { useNearbyStores } from "@/hooks/useNearbyStores";
import { findCheapest } from "@/utils/priceComparison";
import { isValidBarcode } from "../utils/barcodeValidation";
import { CheapestProduct } from "@/types/store";

export default function Index() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loginError, setLoginError] = useState("");

  const [searchProduct, setSearchProduct] = useState("");
  const [cheapestProduct, setCheapestProduct] = useState<CheapestProduct | null>(null);

  const [showScanner, setShowScanner] = useState(false);

  const { region, errorMsg: locationError, loading: locationLoading } = useUserLocation(isLoggedIn);
  const { stores, errorMsg: storesError } = useNearbyStores(region);

  const handleLogin = () => {
    if (email.trim() === "test@test.com" && password === "123456") {
      setLoginError("");
      setIsLoggedIn(true);
    } else {
      setLoginError("Invalid email or password");
    }
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

  return (
    <View style={{ flex: 1 }}>
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
        <BarcodeScanner onScan={handleScanResult} onClose={() => setShowScanner(false)} />
      )}

          {locationLoading || !region ? (
      <ScreenMessage message="Loading map..." />
    ) : (
      <View style={{ flex: 1 }}>
        <StoreMap region={region} stores={stores} />
      </View>
    )}
  </View>
);
}