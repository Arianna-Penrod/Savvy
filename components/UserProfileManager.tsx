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
    <View style={styles.container}> // Main container for the user profile manager, styled with padding, background color, border, and shadow
      <Text style={styles.title}>Shopping Preferences</Text> // Title text for the user profile manager

      <View style={styles.infoPill}> // A styled container (info pill) to display the current user's ID
        <Text style={styles.infoPillText}>User ID: {currentUser.userID}</Text> // Display the current user's ID in an info pill style
      </View>

      <Text style={styles.label}>Search Radius in Miles</Text> // Label for the search radius input field
      <TextInput
        style={styles.input} // Style for the search radius input field
        value={radius} // The value of the search radius input field, bound to the radius state
        onChangeText={setRadius} // Update the radius state when the text in the input field changes
        keyboardType="numeric" // Set the keyboard type to numeric for easier input of numbers
        placeholder="Example: 10" // Placeholder text for the search radius input field
        placeholderTextColor="#94a3b8" // Placeholder text color for the search radius input field
      />

      <Text style={styles.subtitle}>Shopping List</Text> // Subtitle for the shopping list section

      {list.map((item, index) => ( // Map over the shopping list items and render a row for each item, allowing the user to edit the name and quantity of each item
        <View key={index} style={styles.row}> // Container for each item in the shopping list, styled as a row with gap and margin
          <TextInput
            style={styles.itemInput} // Style for the item name input field
            value={item.name} // The value of the item name input field, bound to the name property of the current item
            placeholder="Item" // Placeholder text for the item name input field
            placeholderTextColor="#94a3b8" // Placeholder text color for the item name input field
            onChangeText={(text) => handleItemChange(index, "name", text)} // Update the name of the item in the shopping list when the text in the input field changes, using the handleItemChange function
          />

          <TextInput
            style={styles.quantityInput} // Style for the item quantity input field
            value={item.quantity.toString()} // The value of the item quantity input field, bound to the quantity property of the current item, converted to a string
            placeholder="Qty" // Placeholder text for the item quantity input field
            placeholderTextColor="#94a3b8" // Placeholder text color for the item quantity input field
            keyboardType="numeric" // Set the keyboard type to numeric for easier input of numbers
            onChangeText={(text) => handleItemChange(index, "quantity", text)} // Update the quantity of the item in the shopping list when the text in the input field changes, using the handleItemChange function
          />

          <TouchableOpacity
            style={styles.removeButton} // Style for the remove button, which is a circular button with a background color
            onPress={() => removeItem(index)} // Call the removeItem function with the index of the item to be removed when the button is pressed
          >
            <Text style={styles.removeButtonText}>×</Text> // Text for the remove button, styled to be a large "×" symbol to indicate removal
          </TouchableOpacity>
        </View>
      ))}

      <TouchableOpacity style={styles.secondaryButton} onPress={addItem}> // Button to add a new item to the shopping list, styled as a secondary button
        <Text style={styles.secondaryButtonText}>Add Item</Text> // Text for the add item button, styled to indicate that it is a secondary action
      </TouchableOpacity>

      <TouchableOpacity style={styles.primaryButton} onPress={handleSave}> // Button to save the profile changes, styled as a primary button
        <Text style={styles.primaryButtonText}>Save Profile</Text> // Text for the save profile button, styled to indicate that it is a primary action
      </TouchableOpacity>
    </View>
  );
}


const styles = StyleSheet.create({ // Define the styles for the UserProfileManager component using StyleSheet
  container: { // Style for the main container of the user profile manager, designed to have a white background, rounded corners, border, and shadow for a clean and visually appealing appearance
    padding: 18, // Add padding to the container for spacing
    backgroundColor: "#ffffff", // Set the background color to white
    borderRadius: 22, // Set the border radius to create rounded corners
    borderWidth: 1, // Set the border width to create a visible border around the container
    borderColor: "#dbeafe", // Set the border color to a light blue for a subtle and visually appealing border
    shadowColor: "#000000", // Set the shadow color to black for a subtle shadow effect
    shadowOpacity: 0.06, // Set the shadow opacity to a low value for a subtle shadow effect
    elevation: 2, // Set the elevation to create a shadow effect on Android devices
  },
  title: {  // Style for the title text of the user profile manager
    fontSize: 21, // Set the font size for the title text
    fontWeight: "900", // Set the font weight to 900 for a bold and prominent title
    color: "#1d4ed8", // Set the text color to a vibrant blue to make the title stand out
    marginBottom: 10,  // Add margin to the bottom of the title for spacing between the title and the next element
  },
  infoPill: { // Style for the info pill that displays the current user's ID, designed to be a rounded container with a background color and border
    alignSelf: "flex-start", // Align the info pill to the start of the container
    backgroundColor: "#eff6ff", // Set the background color to a light blue for a visually appealing info pill
    borderWidth: 1, // Set the border width to create a visible border around the info pill
    borderColor: "#bfdbfe", // Set the border color to a slightly darker blue to complement the background color of the info pill
    paddingVertical: 7, // Add vertical padding to the info pill for spacing
    paddingHorizontal: 12, // Add horizontal padding to the info pill for spacing
    borderRadius: 999, // Set the border radius to a high value to create a fully rounded pill shape
    marginBottom: 14, // Add margin to the bottom of the info pill for spacing between the info pill and the next element
  },
  infoPillText: { // Style for the text inside the info pill, designed to be bold and colored to match the overall theme
    color: "#1e3a8a", // Set the text color to a darker blue to match the overall theme and ensure readability
    fontWeight: "800", // Set the font weight to 800 for a bold and prominent text inside the info pill
  },
  label: { // Style for the label text that describes the search radius input field, designed to be bold and colored to match the overall theme
    color: "#1e3a8a", // Set the text color to a darker blue to match the overall theme and ensure readability
    fontWeight: "800", // Set the font weight to 800 for a bold and prominent label text
    marginBottom: 7, // Add margin to the bottom of the label for spacing between the label and the input field
  },
  subtitle: { // Style for the subtitle text that introduces the shopping list section, designed to be bold and colored to match the overall theme, with additional margin for spacing
    marginTop: 14, // Add margin to the top of the subtitle for spacing between the previous section and the subtitle
    marginBottom: 10, // Add margin to the bottom of the subtitle for spacing between the subtitle and the shopping list items
    fontSize: 17, // Set the font size for the subtitle text
    fontWeight: "900", // Set the font weight to 900 for a bold and prominent subtitle
    color: "#0f172a", // Set the text color to a very dark blue (almost black) to ensure readability and contrast with the background
  },
  row: { // Style for the container of each item in the shopping list, designed to be a horizontal row with gap and margin for spacing
    flexDirection: "row", // Set the flex direction to row to arrange the item name, quantity, and remove button horizontally
    alignItems: "center", // Align items vertically to the center for a neat and organized appearance
    gap: 8, // Add a gap between the item name, quantity, and remove button for spacing
    marginBottom: 10, // Add margin to the bottom of each row for spacing between items in the shopping list
  },
  input: { // Style for the search radius input field, designed to have a border, background color, padding, and rounded corners for a clean and user-friendly appearance
    borderWidth: 1, // Set the border width to create a visible border around the input field
    borderColor: "#bfdbfe", // Set the border color to a light blue to complement the overall theme and create a visually appealing input field
    backgroundColor: "#f8fbff", // Set the background color to a very light blue for a clean and visually appealing input field
    borderRadius: 14, // Set the border radius to create rounded corners for a more modern and user-friendly appearance
    paddingVertical: 12, // Add vertical padding to the input field for spacing and improved touch targets
    paddingHorizontal: 14, // Add horizontal padding to the input field for spacing and improved touch targets
    marginBottom: 10, // Add margin to the bottom of the input field for spacing between the input field and the next element
    color: "#0f172a", // Set the text color to a very dark blue (almost black) to ensure readability and contrast with the background of the input field
  },
  itemInput: { // Style for the item name input field in the shopping list, designed to have a border, background color, padding, and rounded corners for a clean and user-friendly appearance, with flex: 1 to allow it to take up available space in the row
    flex: 1, // Allow the item name input field to take up available space in the row, ensuring that it can accommodate longer item names without breaking the layout
    borderWidth: 1, // Set the border width to create a visible border around the item name input field
    borderColor: "#bfdbfe", // Set the border color to a light blue to complement the overall theme and create a visually appealing input field
    backgroundColor: "#f8fbff", // Set the background color to a very light blue for a clean and visually appealing input field
    borderRadius: 14, // Set the border radius to create rounded corners for a more modern and user-friendly appearance
    paddingVertical: 12, // Add vertical padding to the item name input field for spacing and improved touch targets
    paddingHorizontal: 14, // Add horizontal padding to the item name input field for spacing and improved touch targets
    color: "#0f172a", // Set the text color to a very dark blue (almost black) to ensure readability and contrast with the background of the input field
  },
  quantityInput: { // Style for the item quantity input field in the shopping list, designed to have a border, background color, padding, and rounded corners for a clean and user-friendly appearance, with a fixed width to ensure it does not take up too much space in the row
    width: 75, // Set a fixed width for the quantity input field to ensure it does not take up too much space in the row, while still allowing enough room for typical quantity values
    borderWidth: 1, // Set the border width to create a visible border around the quantity input field
    borderColor: "#bfdbfe", // Set the border color to a light blue to complement the overall theme and create a visually appealing input field
    backgroundColor: "#f8fbff", // Set the background color to a very light blue for a clean and visually appealing input field
    borderRadius: 14, // Set the border radius to create rounded corners for a more modern and user-friendly appearance
    paddingVertical: 12, // Add vertical padding to the quantity input field for spacing and improved touch targets
    paddingHorizontal: 14, // Add horizontal padding to the quantity input field for spacing and improved touch targets
    color: "#0f172a", // Set the text color to a very dark blue (almost black) to ensure readability and contrast with the background of the input field
  },
  removeButton: { // Style for the remove button in the shopping list, designed to be a circular button with a background color that stands out, and centered content for the "×" symbol
    width: 42, // Set a fixed width for the remove button to create a circular shape
    height: 42, // Set a fixed height for the remove button to create a circular shape
    borderRadius: 21, // Set the border radius to half of the width and height to create a circular shape
    backgroundColor: "#dbeafe", // Set the background color to a light blue that stands out against the overall theme, making it clear that this button is for removing items
    justifyContent: "center", // Center the content of the remove button vertically
    alignItems: "center",  // Center the content of the remove button horizontally
  },
  removeButtonText: { // Style for the text inside the remove button, designed to be a large "×" symbol that is bold and colored to match the overall theme
    color: "#1d4ed8", // Set the text color to a vibrant blue to match the overall theme and ensure readability against the background of the remove button
    fontSize: 24, // Set the font size to 24 to make the "×" symbol large and easily recognizable as a remove action
    fontWeight: "900", // Set the font weight to 900 for a bold and prominent "×" symbol that clearly indicates its purpose as a remove button
    lineHeight: 26, // Set the line height to ensure that the "×" symbol is vertically centered within the remove button, especially on Android devices where font rendering can differ
  },
  secondaryButton: { // Style for the secondary button used to add items to the shopping list, designed to have a background color that stands out, padding, and rounded corners for a clean and user-friendly appearance
    backgroundColor: "#eff6ff", // Set the background color to a light blue that stands out against the overall theme, making it clear that this button is for adding items
    borderWidth: 1, // Set the border width to create a visible border around the secondary button
    borderColor: "#bfdbfe", // Set the border color to a light blue to complement the background color of the secondary button and create a visually appealing button
    paddingVertical: 13, // Add vertical padding to the secondary button for spacing and improved touch targets
    borderRadius: 14, // Set the border radius to create rounded corners for a more modern and user-friendly appearance
    marginTop: 8, // Add margin to the top of the secondary button for spacing between the button and the previous element (the shopping list items)
  },
  secondaryButtonText: { // Style for the text inside the secondary button, designed to indicate that it is a secondary action with a color that matches the overall theme and bold font weight
    color: "#1d4ed8", // Set the text color to a vibrant blue to match the overall theme and ensure readability against the background of the secondary button
    textAlign: "center", // Center the text horizontally within the secondary button
    fontWeight: "900", // Set the font weight to 900 for a bold and prominent text that clearly indicates its purpose as an action button for adding items
  },
  primaryButton: { // Style for the primary button used to save the profile changes, designed to have a background color that stands out and indicates a primary action, with padding and rounded corners for a clean and user-friendly appearance
    backgroundColor: "#2563eb", // Set the background color to a vibrant blue that stands out against the overall theme, making it clear that this button is for saving the profile changes and is a primary action
    paddingVertical: 14, // Add vertical padding to the primary button for spacing and improved touch targets
    borderRadius: 14, // Set the border radius to create rounded corners for a more modern and user-friendly appearance
    marginTop: 10, // Add margin to the top of the primary button for spacing between the button and the previous element (the add item button)
  },
  primaryButtonText: { // Style for the text inside the primary button, designed to indicate that it is a primary action with a color that contrasts well with the button's background and a bold font weight
    color: "#ffffff", // Set the text color to white to contrast well with the vibrant blue background of the primary button, ensuring readability and making it clear that this is a primary action
    textAlign: "center", // Center the text horizontally within the primary button
    fontWeight: "900", // Set the font weight to 900 for a bold and prominent text that clearly indicates its purpose as an action button for saving the profile changes
  },
});