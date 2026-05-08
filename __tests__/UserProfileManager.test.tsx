import React from "react";
import { render, fireEvent } from "@testing-library/react-native";
import UserProfileManager from "../components/UserProfileManager";

global.alert = jest.fn();

describe("UserProfileManager Component Tests", () => {
  const mockUser = {
  userID: "1",
  name: "Sally",
  email: "test@test.com",
  favoriteStores: ["Walmart", "Target"],

  radiusMiles: 10,

  list: [
    { name: "Milk", quantity: 1 },
    { name: "Eggs", quantity: 2 },
  ],

  location: {
    lat: 0,
    long: 0,
  },
};

  it("renders user profile correctly", () => {
    const { getByText } = render(
      <UserProfileManager
        currentUser={mockUser}
        onUpdate={jest.fn()}
      />
    );

    expect(getByText("Shopping Preferences")).toBeTruthy();
    expect(getByText("User ID: 1")).toBeTruthy();
  });

  it("adds a shopping item", () => {
    const { getByText, getAllByPlaceholderText } = render(
      <UserProfileManager
        currentUser={mockUser}
        onUpdate={jest.fn()}
      />
    );

    fireEvent.press(getByText("Add Item"));

    const itemInputs = getAllByPlaceholderText("Item");

    expect(itemInputs.length).toBe(3);
  });

  it("updates shopping item name", () => {
    const { getAllByPlaceholderText } = render(
      <UserProfileManager
        currentUser={mockUser}
        onUpdate={jest.fn()}
      />
    );

    const itemInputs = getAllByPlaceholderText("Item");

    fireEvent.changeText(itemInputs[0], "Bread");

    expect(itemInputs[0].props.value).toBe("Bread");
  });

  it("calls onUpdate when saving profile", () => {
    const mockUpdate = jest.fn();

    const { getByText } = render(
      <UserProfileManager
        currentUser={mockUser}
        onUpdate={mockUpdate}
      />
    );

    fireEvent.press(getByText("Save Profile"));

    expect(mockUpdate).toHaveBeenCalled();
  });
});