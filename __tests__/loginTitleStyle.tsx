import React from "react";
import { render, waitFor } from "@testing-library/react-native";
import { describe, it, expect, jest } from "@jest/globals";
import { StyleSheet } from "react-native";
import Index from "../app/index";

// Mock expo-location
jest.mock("expo-location", () => ({
  requestForegroundPermissionsAsync: jest.fn(async () => ({ status: "granted" })),
  getCurrentPositionAsync: jest.fn(async () => ({
    coords: { latitude: 35.2226, longitude: -97.4395 },
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

describe("Login page title style test", () => {
  it("checks that the Login title has the correct fontSize and color", async () => {
    const { getByText } = render(<Index />);

    const title = getByText(/Login/i);

    // Flatten the style to access properties
    const flattenedStyle = StyleSheet.flatten(title.props.style);

    expect(flattenedStyle.fontSize).toBe(28);
    expect(flattenedStyle.color).toBeUndefined(); // No color explicitly set in styles
  });
});
