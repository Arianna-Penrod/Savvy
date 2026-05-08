import React from "react";
import { render, fireEvent } from "@testing-library/react-native";
import { describe, it, expect, jest, beforeEach } from "@jest/globals";

// Mock expo-reouter so navigation calls can be observed
jest.mock("expo-router", () => ({
  __esModule: true,
  router: {
    replace: jest.fn(),
    push: jest.fn(),
  },
}));

// Access the router + the screen under test
const { router } = require("expo-router");
const Index = require("../app/index").default;

describe("Login recovery flow test", () => {
  beforeEach(() => {
    // Reset navigation mocks before each test run
    router.replace.mockClear();
    router.push.mockClear();
  });

  it("allows the user to recover from a failed login and then successfully sign in", () => {
    const { getByPlaceholderText, getByText } = render(<Index />);

    // Grab form elements
    const emailInput = getByPlaceholderText("test@test.com");
    const passwordInput = getByPlaceholderText("123456");
    const loginButton = getByText("Log In");

    // First attempt: wrong password + should show error and not navigate
    fireEvent.changeText(emailInput, "test@test.com");
    fireEvent.changeText(passwordInput, "wrongpassword");
    fireEvent.press(loginButton);

    expect(getByText("Invalid email or password")).toBeTruthy();
    expect(router.replace).not.toHaveBeenCalled();

    // Second attempt: correct password, should navigate successfully
    fireEvent.changeText(passwordInput, "123456");
    fireEvent.press(loginButton);

    expect(router.replace).toHaveBeenCalledWith("/landing");
  });
});
