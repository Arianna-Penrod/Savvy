import React from "react";
import { render } from "@testing-library/react-native";
import Index from "../app/index";

// Mock StoreMap because the Index file imports it
jest.mock("../components/StoreMap.web", () => {
  return () => null;
});

// Mock priceComparison because Index imports it
jest.mock("@/utils/priceComparison", () => ({
  findCheapest: jest.fn(),
}));

test("Sign In button has correct color", () => {
  // Render the login page
  const { getByText } = render(<Index />);

  // Find the "Sign In" text inside the button
  const buttonText = getByText("Sign In");

  // Get the parent element
  const button = buttonText.parent;

  // Checks that the button background color matches the expected style
  expect(button.props.style).toEqual(
    expect.objectContaining({
      backgroundColor: "#87b0dbff",
    })
  );
});
