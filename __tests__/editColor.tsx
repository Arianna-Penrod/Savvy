import React from "react";
import { render } from "@testing-library/react-native";
import { describe, it, expect, jest } from "@jest/globals";
import Index from "../app/index";

// Mock dependencies
jest.mock("expo-location", () => ({
  requestForegroundPermissionsAsync: jest.fn(async () => ({ status: "granted" })),
  getCurrentPositionAsync: jest.fn(async () => ({
    coords: { latitude: 35.2226, longitude: -97.4395 },
  })),
}));

jest.mock("../components/StoreMap.web", () => {
  const React = require("react");
  const { Text } = require("react-native");
  return function MockStoreMap() {
    return <Text>Mock Store Map</Text>;
  };
});

jest.mock("@/utils/priceComparison", () => ({
  findCheapest: jest.fn(),
}));

// Login Button Color Test
describe("Login page Sign In button color test", () => {
  it("checks that the Sign In button has the correct background color", () => {
    const { getByText } = render(<Index />);

    // Find the "Sign In" text
    const signInText = getByText("Sign In");

    // Its parent is the TouchableOpacity
    const button = signInText.parent;

    // Flatten the style array if necessary
    const flattenedStyle = Array.isArray(button.props.style)
      ? Object.assign({}, ...button.props.style)
      : button.props.style;

    // Assert the backgroundColor
    expect(flattenedStyle.backgroundColor).toBe("#87b0dbff");
  });
});
