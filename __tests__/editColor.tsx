import React from "react";
import { render } from "@testing-library/react-native";
import { StyleSheet } from "react-native";
import Index from "../app/index";

describe("Login page title color test", () => {
  it("checks that the Login title has the correct style (fontSize and color)", () => {
    const { getByText } = render(<Index />);

    const title = getByText("Login");

    // Flatten the style to access properties
    const flattenedStyle = StyleSheet.flatten(title.props.style);

    // Check the fontSize and fontWeight
    expect(flattenedStyle.fontSize).toBe(28);
    expect(flattenedStyle.fontWeight).toBe("bold");

    // Optional: if you want, check textAlign as well
    expect(flattenedStyle.textAlign).toBe("center");
  });
});
