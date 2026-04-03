import React from "react";
import { render } from "@testing-library/react-native";
import { describe, it, expect, jest } from "@jest/globals";
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
  return function MockStoreMap() { return <Text>Mock Store Map</Text>; };
});

// Mock priceComparison
jest.mock("@/utils/priceComparison", () => ({ findCheapest: jest.fn() }));

/*
  This test validates the login page UI.
  Specifically, it ensures the Sign In button uses the correct background color.
*/

describe("Login page color test", () => {
  it("checks that the Sign In button has the correct background color", async () => {
    const { getByText } = render(<Index />);

    // Find the Sign In text
    const buttonText = await getByText("Sign In");

    // Access parent TouchableOpacity style
    const buttonStyle = buttonText?.parent?.props?.style;

    // In React Native, style can be an array — flatten if needed
    let flattenedStyle = {};
    if (Array.isArray(buttonStyle)) {
      flattenedStyle = Object.assign({}, ...buttonStyle);
    } else {
      flattenedStyle = buttonStyle || {};
    }

    expect(flattenedStyle.backgroundColor).toBe("#87b0dbff");
  });
});
