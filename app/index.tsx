import { useState } from "react";
import { router } from "expo-router";
import LoginForm from "@/components/LoginForm";
// this will be the first page that the user sees, they will be prompted to login
// after logging in they will go to the langing page

export default function Index() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loginError, setLoginError] = useState("");

  const handleLogin = () => {
    if (email.trim() === "test@test.com" && password === "123456") {
      setLoginError("");
      router.replace("/landing");
    } else {
      setLoginError("Invalid email or password");
    }
  };

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
