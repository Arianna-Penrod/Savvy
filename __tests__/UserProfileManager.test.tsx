import React from "react";
import { render, fireEvent } from "@testing-library/react-native";
import UserProfileManager from "../components/UserProfileManager";

global.alert = jest.fn();

describe("UserProfileManager Component Tests", () => { // Define a test suite for the UserProfileManager component
  const mockUser = { // Create a mock user object to use in tests
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

  it("renders user profile correctly", () => { // Test that the component renders the user's profile information correctly
    const { getByText } = render(
      <UserProfileManager
        currentUser={mockUser}
        onUpdate={jest.fn()}
      />
    );

    expect(getByText("Shopping Preferences")).toBeTruthy(); // Check that the title is rendered
    expect(getByText("User ID: 1")).toBeTruthy(); // Check that the user ID is rendered
  });

  it("adds a shopping item", () => { // Test that clicking the "Add Item" button adds a new item input field to the shopping list
    const { getByText, getAllByPlaceholderText } = render(
      <UserProfileManager
        currentUser={mockUser}
        onUpdate={jest.fn()}
      />
    );

    fireEvent.press(getByText("Add Item")); // Simulate pressing the "Add Item" button

    const itemInputs = getAllByPlaceholderText("Item");

    expect(itemInputs.length).toBe(3);
  });

  it("updates shopping item name", () => { // Test that changing the text in an item input field updates the corresponding item name in the component's state
    const { getAllByPlaceholderText } = render( // Render the component with the mock user
      <UserProfileManager
        currentUser={mockUser}
        onUpdate={jest.fn()}
      />
    );

    const itemInputs = getAllByPlaceholderText("Item"); // Get all item input fields

    fireEvent.changeText(itemInputs[0], "Bread"); // Simulate changing the text of the first item input field to "Bread"

    expect(itemInputs[0].props.value).toBe("Bread"); // Check that the value of the first item input field has been updated to "Bread"
  });

  it("calls onUpdate when saving profile", () => { // Test that clicking the "Save Profile" button calls the onUpdate function passed as a prop to the component
    const mockUpdate = jest.fn();

    const { getByText } = render( // Render the component with the mock user and the mock onUpdate function
      <UserProfileManager
        currentUser={mockUser}
        onUpdate={mockUpdate}
      />
    );

    fireEvent.press(getByText("Save Profile")); // Simulate pressing the "Save Profile" button

    expect(mockUpdate).toHaveBeenCalled(); // Check that the mock onUpdate function was called when the "Save Profile" button was pressed
  });
});