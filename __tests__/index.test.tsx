import React from "react";
import { render, fireEvent, waitFor } from "@testing-library/react-native";
import { describe, expect, it, jest } from "@jest/globals";
import Index from "../app/index";

// Mock expo-location so login success doesn't try to use the real device location
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

// Mock StoreMap so the map component doesn't break the test
jest.mock("../components/StoreMap.web", () => {
  const React = require("react");
  const { Text } = require("react-native");
  return function MockStoreMap() {
    return <Text>Mock Store Map</Text>;
  };
});

// Mock priceComparison import used by the component
jest.mock("@/utils/priceComparison", () => ({
  findCheapest: jest.fn(),
}));

describe("Index login password tests", () => {
  it("marks the password input as secure", () => {
    const { getByPlaceholderText } = render(<Index />);

    const passwordInput = getByPlaceholderText("Password");
    expect(passwordInput.props.secureTextEntry).toBe(true);
  });

  it("shows an error when the password is incorrect", () => {
    const { getByPlaceholderText, getByText } = render(<Index />);

    fireEvent.changeText(getByPlaceholderText("Email"), "test@test.com");
    fireEvent.changeText(getByPlaceholderText("Password"), "wrongpassword");
    fireEvent.press(getByText("Sign In"));

    expect(getByText("Invalid email or password")).toBeTruthy();
  });

  it("logs in successfully when the password is correct", async () => {
    const { getByPlaceholderText, getByText, queryByText } = render(<Index />);

    fireEvent.changeText(getByPlaceholderText("Email"), "test@test.com");
    fireEvent.changeText(getByPlaceholderText("Password"), "123456");
    fireEvent.press(getByText("Sign In"));

    await waitFor(() => {
      expect(queryByText("Sign In")).toBeNull();
    });
  });

  it("fails login when the password is empty", () => {
    const { getByPlaceholderText, getByText } = render(<Index />);

    fireEvent.changeText(getByPlaceholderText("Email"), "test@test.com");
    fireEvent.changeText(getByPlaceholderText("Password"), "");
    fireEvent.press(getByText("Sign In"));

    expect(getByText("Invalid email or password")).toBeTruthy();
  });
});