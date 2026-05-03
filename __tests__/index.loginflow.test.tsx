import React from "react";
import { render, fireEvent } from "@testing-library/react-native";
import { describe, it, expect, jest, beforeEach } from "@jest/globals";

jest.mock("expo-router", () => ({
  __esModule: true,
  router: {
    replace: jest.fn(),
    push: jest.fn(),
  },
}));

const { router } = require("expo-router");
const Index = require("../app/index").default;

describe("Login recovery flow test", () => {
  beforeEach(() => {
    router.replace.mockClear();
    router.push.mockClear();
  });

  it("allows the user to recover from a failed login and then successfully sign in", () => {
    const { getByPlaceholderText, getByText } = render(<Index />);

    const emailInput = getByPlaceholderText("test@test.com");
    const passwordInput = getByPlaceholderText("123456");
    const loginButton = getByText("Log In");

    fireEvent.changeText(emailInput, "test@test.com");
    fireEvent.changeText(passwordInput, "wrongpassword");
    fireEvent.press(loginButton);

    expect(getByText("Invalid email or password")).toBeTruthy();
    expect(router.replace).not.toHaveBeenCalled();

    fireEvent.changeText(passwordInput, "123456");
    fireEvent.press(loginButton);

    expect(router.replace).toHaveBeenCalledWith("/landing");
  });
});