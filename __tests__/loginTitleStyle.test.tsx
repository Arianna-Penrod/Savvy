import React from "react";
import { render } from "@testing-library/react-native";
import { describe, it, expect, jest } from "@jest/globals";
import { StyleSheet } from "react-native";
import Index from "../app/index";

const mockReplace = jest.fn();

jest.mock("expo-router", () => ({
  router: {
    replace: mockReplace,
    push: jest.fn(),
  },
}));

describe("Login page title style test", () => {
  it("checks that the Welcome back title has the correct blue-theme styling", () => {
    const { getByText } = render(<Index />);

    const title = getByText("Welcome back");
    const flattenedStyle = StyleSheet.flatten(title.props.style);

    expect(flattenedStyle.fontSize).toBe(32);
    expect(flattenedStyle.fontWeight).toBe("900");
    expect(flattenedStyle.color).toBe("#0f172a");
  });
});