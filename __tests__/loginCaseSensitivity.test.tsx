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

describe("Login case sensitivity tests", () => {
  beforeEach(() => {
    mockReplace.mockClear();
  });

  it("fails login when the email case is incorrect", () => {
    const { getByPlaceholderText, getByText } = render(<Index />);

    fireEvent.changeText(getByPlaceholderText("test@test.com"), "Test@Test.com");
    fireEvent.changeText(getByPlaceholderText("123456"), "123456");
    fireEvent.press(getByText("Log In"));

    expect(getByText("Invalid email or password")).toBeTruthy();
    expect(mockReplace).not.toHaveBeenCalled();
  });

  it("fails login when the password is incorrect", () => {
    const { getByPlaceholderText, getByText } = render(<Index />);

    fireEvent.changeText(getByPlaceholderText("test@test.com"), "test@test.com");
    fireEvent.changeText(getByPlaceholderText("123456"), "1234567");
    fireEvent.press(getByText("Log In"));

    expect(getByText("Invalid email or password")).toBeTruthy();
    expect(mockReplace).not.toHaveBeenCalled();
  });

  it("passes login only with the exact correct email and password", () => {
    const { getByPlaceholderText, getByText } = render(<Index />);

    fireEvent.changeText(getByPlaceholderText("test@test.com"), "test@test.com");
    fireEvent.changeText(getByPlaceholderText("123456"), "123456");
    fireEvent.press(getByText("Log In"));

    expect(mockReplace).toHaveBeenCalledWith("/landing");
  });
});