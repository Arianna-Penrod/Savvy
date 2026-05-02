import React from "react";
import { render, fireEvent } from "@testing-library/react-native";
import { describe, expect, it, jest, beforeEach } from "@jest/globals";

jest.mock("expo-router", () => ({
  __esModule: true,
  router: {
    replace: jest.fn(),
    push: jest.fn(),
  },
}));

const { router } = require("expo-router");
const Index = require("../app/index").default;

describe("Index login tests", () => {
  beforeEach(() => {
    router.replace.mockClear();
    router.push.mockClear();
  });

  it("logs in successfully when the email and password are correct", () => {
    const { getByPlaceholderText, getByText } = render(<Index />);

    fireEvent.changeText(getByPlaceholderText("test@test.com"), "test@test.com");
    fireEvent.changeText(getByPlaceholderText("123456"), "123456");
    fireEvent.press(getByText("Log In"));

    expect(router.replace).toHaveBeenCalledWith("/landing");
  });
});