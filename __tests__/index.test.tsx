import React from "react";
import { render, fireEvent } from "@testing-library/react-native";
import { describe, expect, it, jest, beforeEach } from "@jest/globals";

const mockReplace = jest.fn();

jest.mock("expo-router", () => ({
  router: {
    replace: mockReplace,
    push: jest.fn(),
  },
}));

import Index from "../app/index";

describe("Index login tests", () => {
  beforeEach(() => {
    mockReplace.mockClear();
  });

  it("logs in successfully when the email and password are correct", () => {
    const { getByPlaceholderText, getByText } = render(<Index />);

    fireEvent.changeText(getByPlaceholderText("test@test.com"), "test@test.com");
    fireEvent.changeText(getByPlaceholderText("123456"), "123456");
    fireEvent.press(getByText("Log In"));

    expect(mockReplace).toHaveBeenCalledWith("/landing");
  });
});