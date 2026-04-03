import React from "react";
import { render } from "@testing-library/react-native";
import { StyleSheet } from "react-native";
import Index from "../app/index";

describe("Login page Sign In button color test", () => {
  it("checks that the Sign In button has the correct background color", () => {
    const { getByText } = render(<Index />);

    // Find the Text element inside the button
    const buttonText = getByText("Sign In");

    // The TouchableOpacity is the parent of the Text
    const button = buttonText.parent;

    // Flatten the style so we can read backgroundColor
    const flattenedStyle = StyleSheet.flatten(button.props.style);

    // Assert the backgroundColor matches
    expect(flattenedStyle.backgroundColor).toBe("#87b0dbff");
  });
});
