import { useState } from "react";
import { router } from "expo-router";
import LoginForm from "@/components/LoginForm";

// First screen shown to user - handles login and redirects to landing page
export default function Index() {
  // Track form input values
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  
  // Store login error message 
  const [loginError, setLoginError] = useState("");

  // Validate credentials and navigate on success
  const handleLogin = () => {
    if (email.trim() === "Test@test.com" && password === "123456") {
      setLoginError("");
      router.replace("/landing"); // Go to landing page after successful login
    } else {
      setLoginError("Invalid email or password"); // Show error message
    }
  };

  // Pass state + handlers down to the reusable LoginForm component
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
