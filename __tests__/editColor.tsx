import React from "react";
import { render } from "@testing-library/react-native";
import { describe, expect, it, jest } from "@jest/globals";
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

// Mock priceComparison import used by the component
jest.mock("@/utils/priceComparison", () => ({
  findCheapest: jest.fn(),
}));

/*
  These tests validate the login page UI.
  This particular test checks that the Sign In button
  uses the correct background color according to design.
*/

describe("Login page color test", () => {
  it("checks that the Sign In button has the correct background color", () => {
    const { getByText } = render(<Index />);

    // Find the button text
    const buttonText = getByText("Sign In");

    // The parent element is the TouchableOpacity button
    const button = buttonText.parent;

    // Verify the button style has the expected background color
    expect(button.props.style).toEqual(
      expect.objectContaining({
        backgroundColor: "#87b0dbff",
      })
    );
  });
});
