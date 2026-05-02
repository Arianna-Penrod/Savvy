import React from "react";
import { render, fireEvent } from "@testing-library/react-native";
import { describe, it, expect, jest, beforeEach } from "@jest/globals";
import Index from "../app/index";

const mockReplace = jest.fn();

jest.mock("expo-router", () => ({
  router: {
    replace: mockReplace,
    push: jest.fn(),
  },
}));

describe("Login recovery flow test", () => {
  beforeEach(() => {
    mockReplace.mockClear();
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
    expect(mockReplace).not.toHaveBeenCalled();

    fireEvent.changeText(passwordInput, "123456");
    fireEvent.press(loginButton);

    expect(mockReplace).toHaveBeenCalledWith("/landing");
  });
});