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

describe("Login case sensitivity tests", () => {
  beforeEach(() => {
    router.replace.mockClear();
    router.push.mockClear();
  });

  it("fails login when the email case is incorrect", () => {
    const { getByPlaceholderText, getByText } = render(<Index />);

    fireEvent.changeText(getByPlaceholderText("test@test.com"), "Test@Test.com");
    fireEvent.changeText(getByPlaceholderText("123456"), "123456");
    fireEvent.press(getByText("Log In"));

    expect(getByText("Invalid email or password")).toBeTruthy();
    expect(router.replace).not.toHaveBeenCalled();
  });

  it("fails login when the password is incorrect", () => {
    const { getByPlaceholderText, getByText } = render(<Index />);

    fireEvent.changeText(getByPlaceholderText("test@test.com"), "test@test.com");
    fireEvent.changeText(getByPlaceholderText("123456"), "1234567");
    fireEvent.press(getByText("Log In"));

    expect(getByText("Invalid email or password")).toBeTruthy();
    expect(router.replace).not.toHaveBeenCalled();
  });

  it("passes login only with the exact correct email and password", () => {
    const { getByPlaceholderText, getByText } = render(<Index />);

    fireEvent.changeText(getByPlaceholderText("test@test.com"), "test@test.com");
    fireEvent.changeText(getByPlaceholderText("123456"), "123456");
    fireEvent.press(getByText("Log In"));

    expect(router.replace).toHaveBeenCalledWith("/landing");
  });
});