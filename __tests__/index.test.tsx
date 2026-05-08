import React from "react";
import { render, fireEvent } from "@testing-library/react-native";
import { describe, expect, it, jest, beforeEach } from "@jest/globals";

// Expo-router so navigation calles can be tracked in tests
jest.mock("expo-router", () => ({
  __esModule: true,
  router: {
    replace: jest.fn(),
    push: jest.fn(),
  },
}));

// Access the router + the screen being tested
const { router } = require("expo-router");
const Index = require("../app/index").default;

describe("Index login tests", () => {
  beforeEach(() => {
    // Reset nevigation before each test
    router.replace.mockClear();
    router.push.mockClear();
  });

  it("logs in successfully when the email and password are correct", () => {
    const { getByPlaceholderText, getByText } = render(<Index />);

    // Enter valid credentials
    fireEvent.changeText(getByPlaceholderText("test@test.com"), "test@test.com");
    fireEvent.changeText(getByPlaceholderText("123456"), "123456");

    // Submit login
    fireEvent.press(getByText("Log In"));

    // Should navigate to landing page
    expect(router.replace).toHaveBeenCalledWith("/landing");
  });
});
