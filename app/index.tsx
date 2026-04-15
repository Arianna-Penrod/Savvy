import { useState } from "react";
import { View } from "react-native";
import StoreMap from "../components/StoreMap.web";
import LoginForm from "@/components/LoginForm";
import ProductSearchPanel from "@/components/ProductSearchPanel";
import ScreenMessage from "@/components/ScreenMessage";
import { useUserLocation } from "@/hooks/useUserLocation";
import { useNearbyStores } from "@/hooks/useNearbyStores";
import { findCheapest } from "@/utils/priceComparison";
import { CheapestProduct } from "@/types/store";

export default function Index() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loginError, setLoginError] = useState("");

  const [searchProduct, setSearchProduct] = useState("");
  const [cheapestProduct, setCheapestProduct] = useState<CheapestProduct | null>(null);

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
  if (locationLoading || !region) return <ScreenMessage message="Loading map..." />;

  return (
    <View style={{ flex: 1 }}>
      <ProductSearchPanel
        searchProduct={searchProduct}
        onChangeSearch={setSearchProduct}
        onSearch={handleSearch}
        result={cheapestProduct}
      />

      <View style={{ flex: 1 }}>
        <StoreMap region={region} stores={stores} />
      </View>
    </View>
  );
}