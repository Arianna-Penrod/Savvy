import React from "react";
import { render, screen } from "@testing-library/react-native";
import { StyleSheet } from "react-native";
import Index from "../pages/index"; // adjust path if needed

describe("Login page title color test", () => {
  it("checks that the Login title has the correct style (fontSize and color)", () => {
    const { getByText } = render(<Index />);

    // Get the Login title text
    const title = getByText(/Login/i);

    // Flatten the style to access individual properties
    const flattenedStyle = StyleSheet.flatten(title.props.style);

    // Assert the expected style properties
    expect(flattenedStyle.fontSize).toBe(28);
    expect(flattenedStyle.fontWeight).toBe("bold");
    expect(flattenedStyle.color).toBeUndefined(); // color not set, uses default
  });
});
