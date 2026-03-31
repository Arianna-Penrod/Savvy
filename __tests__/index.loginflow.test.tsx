import React from "react";
import { render, fireEvent, waitFor } from "@testing-library/react-native";
import { describe, it, expect, jest } from "@jest/globals";
import Index from "../app/index";

// Mock expo-location
jest.mock("expo-location", () => ({
  requestForegroundPermissionsAsync: jest.fn(async () => ({
    status: "granted",
  })),
  getCurrentPositionAsync: jest.fn(async () => ({
    coords: {
      latitude: 35.2226,
      longitude: -97.4395,
    },
  })),
}));

// Mock StoreMap
jest.mock("../components/StoreMap.web", () => {
  const React = require("react");
  const { Text } = require("react-native");
  return function MockStoreMap() {
    return <Text>Mock Store Map</Text>;
  };
});

// Mock priceComparison
jest.mock("@/utils/priceComparison", () => ({
  findCheapest: jest.fn(),
}));

describe("Login recovery flow test", () => {

  it("allows user to recover from failed login and successfully sign in", async () => {
    const { getByPlaceholderText, getByText, queryByText } = render(<Index />);

    const emailInput = getByPlaceholderText("Email");
    const passwordInput = getByPlaceholderText("Password");
    const signInButton = getByText("Sign In");

    // Step 1: Wrong password
    fireEvent.changeText(emailInput, "test@test.com");
    fireEvent.changeText(passwordInput, "wrongpassword");
    fireEvent.press(signInButton);

    expect(getByText("Invalid email or password")).toBeTruthy();

    // Step 2: Correct password
    fireEvent.changeText(passwordInput, "123456");
    fireEvent.press(signInButton);

    // Step 3: Login success
    await waitFor(() => {
      expect(queryByText("Sign In")).toBeNull();
    });
  });

});