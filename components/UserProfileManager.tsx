// UserProfileManager component
// This component allows users to manage shopping preferences such as: search radius, shopping list items, and item quantities.
// It provides an interface for users to view and edit their shopping preferences, and save the changes to their profile.

import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
} from "react-native"; // Import React Native UI components to build the profile interface
import { useState } from "react"; // Import useState from React to manage component state
import { user } from "@/data/demoUser"; // Import the user type from the data file for consistent profile structure

type Props = { // Define the props for the UserProfileManager component
  currentUser: user;   // The current user's profile data
  onUpdate: (updatedUser: user) => void;  // A function used to save profile changes
};

export default function UserProfileManager({ currentUser, onUpdate }: Props) { // Define the UserProfileManager component
  const [radius, setRadius] = useState(currentUser.radiusMiles.toString()); // State for the search radius, initialized with the current user's radiusMiles converted to a string
  const [list, setList] = useState(currentUser.list); // State for the shopping list, initialized with the current user's list

  const handleItemChange = ( // Function to handle changes to the shopping list items
    index: number, // The index of the item being updated
    field: "name" | "quantity", // The field being updated (either the name or quantity of the item)
    value: string // The new value for the field
  ) => {
    const updatedList = [...list]; // Create a copy of the current list to avoid mutating state directly

    if (field === "quantity") { // If the field being updated is the quantity, parse the value as an integer and update the quantity of the item at the specified index
      updatedList[index].quantity = parseInt(value) || 0; // If the value cannot be parsed as an integer, default to 0
    } else { // If the field being updated is the name, update the name of the item at the specified index
      updatedList[index].name = value; // Update the name of the item at the specified index
    }

    setList(updatedList); // Update the state with the modified list
  };

  const addItem = () => { // Function to add a new item to the shopping list
    setList([...list, { name: "", quantity: 1 }]); // Add a new item with an empty name and a default quantity of 1 to the list
  };

  const removeItem = (index: number) => { // Function to remove an item from the shopping list based on its index
    const updatedList = list.filter((_, i) => i !== index); // Create a new list that excludes the item at the specified index
    setList(updatedList); // Update the state with the modified list
  };

  const handleSave = () => { // Function to handle saving the updated profile information
    const updatedUser = { // Create an updated user object that includes the current user's information along with the updated radius and shopping list
      ...currentUser, // Spread the current user's information to retain unchanged fields
      radiusMiles: parseFloat(radius), // Update the radiusMiles field by parsing the radius state as a float
      list, // Update the list field with the current state of the shopping list
    };

    onUpdate(updatedUser); // Call the onUpdate callback function with the updated user object to save the changes
    alert("Profile saved!"); // Display an alert to the user indicating that the profile has been saved successfully
  };


  /*
   The component's UI is structured using a View container that includes various Text and TextInput components for 
   displaying and editing the user's shopping preferences, 
   as well as TouchableOpacity components for adding items to the shopping list and saving the profile changes. 
   The styles are defined using StyleSheet to ensure a consistent and visually appealing design.
  */
  return (
    <View style={styles.container}>
      {/* Main container for the user profile manager, styled with padding, background color, border, and shadow */}
      <Text style={styles.title}>Shopping Preferences</Text>
      {/* Title text for the user profile manager */}

      <View style={styles.infoPill}>
        {/* A styled container (info pill) to display the current user's ID */}
        <Text style={styles.infoPillText}>User ID: {currentUser.userID}</Text>
        {/* Display the current user's ID in an info pill style */}
      </View>

      <Text style={styles.label}>Search Radius in Miles</Text>
      {/* Label for the search radius input field */}
      {/* Style for the search radius input field */}
      {/* The value of the search radius input field, bound to the radius state */}
      {/* Update the radius state when the text in the input field changes */}
      {/* Set the keyboard type to numeric for easier input of numbers */}
      {/* Placeholder text for the search radius input field */}
      {/* Placeholder text color for the search radius input field */}
      <TextInput
        style={styles.input}
        value={radius}
        onChangeText={setRadius}
        keyboardType="numeric"
        placeholder="Example: 10"
        placeholderTextColor="#94a3b8"
      />

      <Text style={styles.subtitle}>Shopping List</Text>
      {/* Subtitle for the shopping list section */}

      {list.map((item, index) => (
        <View key={index} style={styles.row}>
          {/* Map over the shopping list items and render a row for each item, allowing the user to edit the name and quantity of each item */}
          {/* Container for each item in the shopping list, styled as a row with gap and margin */}
          {/* Style for the item name input field */}
          {/* The value of the item name input field, bound to the name property of the current item */}
          {/* Placeholder text for the item name input field */}
          {/* Placeholder text color for the item name input field */}
          {/* Update the name of the item in the shopping list when the text in the input field changes, using the handleItemChange function */}
          <TextInput
            style={styles.itemInput}
            value={item.name}
            placeholder="Item"
            placeholderTextColor="#94a3b8"
            onChangeText={(text) => handleItemChange(index, "name", text)}
          />

          {/* Style for the item quantity input field */}
          {/* The value of the item quantity input field, bound to the quantity property of the current item, converted to a string */}
          {/* Placeholder text for the item quantity input field */}
          {/* Placeholder text color for the item quantity input field */}
          {/* Set the keyboard type to numeric for easier input of numbers */}
          {/* Update the quantity of the item in the shopping list when the text in the input field changes, using the handleItemChange function */}
          <TextInput
            style={styles.quantityInput}
            value={item.quantity.toString()}
            placeholder="Qty"
            placeholderTextColor="#94a3b8"
            keyboardType="numeric"
            onChangeText={(text) => handleItemChange(index, "quantity", text)}
          />

          {/* Style for the remove button, which is a circular button with a background color */}
          {/* Call the removeItem function with the index of the item to be removed when the button is pressed */}
          <TouchableOpacity
            style={styles.removeButton}
            onPress={() => removeItem(index)}
          >
            <Text style={styles.removeButtonText}>×</Text>
            {/* Text for the remove button, styled to be a large "×" symbol to indicate removal */}
          </TouchableOpacity>
        </View>
      ))}

      <TouchableOpacity style={styles.secondaryButton} onPress={addItem}>
        {/* Button to add a new item to the shopping list, styled as a secondary button */}
        <Text style={styles.secondaryButtonText}>Add Item</Text>
        {/* Text for the add item button, styled to indicate that it is a secondary action */}
      </TouchableOpacity>

      <TouchableOpacity style={styles.primaryButton} onPress={handleSave}>
        {/* Button to save the profile changes, styled as a primary button */}
        <Text style={styles.primaryButtonText}>Save Profile</Text>
        {/* Text for the save profile button, styled to indicate that it is a primary action */}
      </TouchableOpacity>
    </View>
  );
}


const styles = StyleSheet.create({ // Define the styles for the UserProfileManager component using StyleSheet
  container: { // Style for the main container of the user profile manager, designed to have a white background, rounded corners, border, and shadow for a clean and visually appealing appearance
    padding: 18, 
    backgroundColor: "#ffffff", 
    borderRadius: 22, 
    borderWidth: 1, 
    borderColor: "#dbeafe", 
    shadowColor: "#000000", 
    shadowOpacity: 0.06, 
    elevation: 2, 
  },
  title: {  // Style for the title text of the user profile manager
    fontSize: 21, 
    fontWeight: "900", 
    color: "#1d4ed8", 
    marginBottom: 10,  
  },
  infoPill: { // Style for the info pill that displays the current user's ID, designed to be a rounded container with a background color and border
    alignSelf: "flex-start",
    backgroundColor: "#eff6ff", 
    borderWidth: 1, 
    borderColor: "#bfdbfe", 
    paddingVertical: 7, 
    paddingHorizontal: 12, 
    borderRadius: 999, 
    marginBottom: 14, 
  },
  infoPillText: { // Style for the text inside the info pill, designed to be bold and colored to match the overall theme
    color: "#1e3a8a", 
    fontWeight: "800", 
  },
  label: { // Style for the label text that describes the search radius input field, designed to be bold and colored to match the overall theme
    color: "#1e3a8a",
    fontWeight: "800", 
    marginBottom: 7, 
  },
  subtitle: { // Style for the subtitle text that introduces the shopping list section, designed to be bold and colored to match the overall theme, with additional margin for spacing
    marginTop: 14, 
    marginBottom: 10,
    fontSize: 17, 
    fontWeight: "900", 
    color: "#0f172a", 
  },
  row: { // Style for the container of each item in the shopping list, designed to be a horizontal row with gap and margin for spacing
    flexDirection: "row", 
    alignItems: "center",
    gap: 8, 
    marginBottom: 10, 
  },
  input: { // Style for the search radius input field, designed to have a border, background color, padding, and rounded corners for a clean and user-friendly appearance
    borderWidth: 1, 
    borderColor: "#bfdbfe",
    backgroundColor: "#f8fbff",
    borderRadius: 14,
    paddingVertical: 12, 
    paddingHorizontal: 14, 
    marginBottom: 10,
    color: "#0f172a",
  },
  itemInput: { // Style for the item name input field in the shopping list, designed to have a border, background color, padding, and rounded corners for a clean and user-friendly appearance, with flex: 1 to allow it to take up available space in the row
    flex: 1, 
    borderWidth: 1, 
    borderColor: "#bfdbfe", 
    backgroundColor: "#f8fbff", 
    borderRadius: 14, 
    paddingVertical: 12, 
    paddingHorizontal: 14, 
    color: "#0f172a",  
  },
  quantityInput: { // Style for the item quantity input field in the shopping list, designed to have a border, background color, padding, and rounded corners for a clean and user-friendly appearance, with a fixed width to ensure it does not take up too much space in the row
    width: 75, 
    borderWidth: 1, 
    borderColor: "#bfdbfe", 
    backgroundColor: "#f8fbff", 
    borderRadius: 14,
    paddingVertical: 12, 
    paddingHorizontal: 14, 
    color: "#0f172a", 
  },
  removeButton: { // Style for the remove button in the shopping list, designed to be a circular button with a background color that stands out, and centered content for the "×" symbol
    width: 42, 
    height: 42, 
    borderRadius: 21, 
    backgroundColor: "#dbeafe",
    justifyContent: "center", 
    alignItems: "center",  
  },
  removeButtonText: { // Style for the text inside the remove button, designed to be a large "×" symbol that is bold and colored to match the overall theme
    color: "#1d4ed8", 
    fontSize: 24, 
    fontWeight: "900", 
    lineHeight: 26, 
  },
  secondaryButton: { // Style for the secondary button used to add items to the shopping list, designed to have a background color that stands out, padding, and rounded corners for a clean and user-friendly appearance
    backgroundColor: "#eff6ff",
    borderWidth: 1, 
    borderColor: "#bfdbfe", 
    paddingVertical: 13, 
    borderRadius: 14, 
    marginTop: 8, 
  },
  secondaryButtonText: { // Style for the text inside the secondary button, designed to indicate that it is a secondary action with a color that matches the overall theme and bold font weight
    color: "#1d4ed8", 
    textAlign: "center",
    fontWeight: "900", 
  },
  primaryButton: { // Style for the primary button used to save the profile changes, designed to have a background color that stands out and indicates a primary action, with padding and rounded corners for a clean and user-friendly appearance
    backgroundColor: "#2563eb", 
    paddingVertical: 14, 
    borderRadius: 14, 
    marginTop: 10, 
  },
  primaryButtonText: { // Style for the text inside the primary button, designed to indicate that it is a primary action with a color that contrasts well with the button's background and a bold font weight
    color: "#ffffff", 
    textAlign: "center", 
    fontWeight: "900", 
  },
});
