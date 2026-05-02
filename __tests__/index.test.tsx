import React from "react";
import { render, fireEvent } from "@testing-library/react-native";
import { describe, expect, it, jest, beforeEach } from "@jest/globals";
import Index from "../app/index";

const mockReplace = jest.fn();

jest.mock("expo-router", () => ({
  router: {
    replace: mockReplace,
    push: jest.fn(),
  },
}));

describe("Index login tests", () => {
  beforeEach(() => {
    mockReplace.mockClear();
  });

  it("shows the pretty login screen", () => {
    const { getByText } = render(<Index />);

    expect(getByText("Savvy")).toBeTruthy();
    expect(getByText("Welcome back")).toBeTruthy();
    expect(getByText("Log In")).toBeTruthy();
  });

  it("marks the password input as secure", () => {
    const { getByPlaceholderText } = render(<Index />);

    const passwordInput = getByPlaceholderText("123456");

    expect(passwordInput.props.secureTextEntry).toBe(true);
  });

  it("shows an error when the password is incorrect", () => {
    const { getByPlaceholderText, getByText } = render(<Index />);

    fireEvent.changeText(getByPlaceholderText("test@test.com"), "test@test.com");
    fireEvent.changeText(getByPlaceholderText("123456"), "wrongpassword");
    fireEvent.press(getByText("Log In"));

    expect(getByText("Invalid email or password")).toBeTruthy();
    expect(mockReplace).not.toHaveBeenCalled();
  });

  it("logs in successfully when the email and password are correct", () => {
    const { getByPlaceholderText, getByText } = render(<Index />);

    fireEvent.changeText(getByPlaceholderText("test@test.com"), "test@test.com");
    fireEvent.changeText(getByPlaceholderText("123456"), "123456");
    fireEvent.press(getByText("Log In"));

    expect(mockReplace).toHaveBeenCalledWith("/landing");
  });

  it("fails login when the password is empty", () => {
    const { getByPlaceholderText, getByText } = render(<Index />);

    fireEvent.changeText(getByPlaceholderText("test@test.com"), "test@test.com");
    fireEvent.changeText(getByPlaceholderText("123456"), "");
    fireEvent.press(getByText("Log In"));

    expect(getByText("Invalid email or password")).toBeTruthy();
    expect(mockReplace).not.toHaveBeenCalled();
  });
});