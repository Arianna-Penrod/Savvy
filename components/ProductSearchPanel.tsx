// Imports Reactive Native UI components used to build the search panel.
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
} from "react-native";

// Imports the type used for the cheapest product search result.
import { CheapestProduct } from "@/types/store";

// Defines the data and functions this component recives from its parent.
type Props = {
// Current input typed into the search bar.
  searchProduct: string;
  
// Updates the search input value whenever the user types.
  onChangeSearch: (value: string) => void;
  
// Runs the product search after the user presses the button.
  onSearch: () => void;
  
// Stores the cheapest matching product result of null if the result doesn't exist.
  result: CheapestProduct | null;
};

// Displayes the product search box and the cheapest result.
export default function ProductSearchPanel({
  searchProduct, 
  onChangeSearch,
  onSearch,
  result,
  // Main box that holds the whole product search section.
}: Props) {
  return (
    <View style={styles.searchContainer}>
      <Text style={styles.title}>Product Search</Text>

      <Text style={styles.description}>
        Search for an item and Savvy will find the cheapest matching store.
      </Text>

      <TextInput
        // Applies styling to the search input.
        style={styles.input}

        // Light gray example text shown before the user types.
        placeholder="Search product, like Milk, Eggs, Bread"
        
        // Sets the color of the placeholder text.
        placeholderTextColor="#94a3b8"

        // Shows the current search text from the parent state.
        value={searchProduct}

        // Updates the search text every time the user types.
        onChangeText={onChangeSearch}
      />

      <TouchableOpacity style={styles.button} onPress={onSearch}>
        <Text style={styles.buttonText}>Find Cheapest</Text>
      </TouchableOpacity>

      {result && (
        <View style={styles.resultBox}>
          <Text style={styles.resultLabel}>Best match</Text>
          <Text style={styles.resultText}>Cheapest Store: {result.store}</Text>
          <Text style={styles.resultText}>Price: ${result.price}</Text>
        </View>
      )}
    </View>
  );
}

// The styles for the input, button, and result display.
const styles = StyleSheet.create({

  // Style for the main search panel container.
  searchContainer: {
    padding: 18,                 // Adds space inside the panel.
    backgroundColor: "#ffffff",  // Makes the panel background white
    borderRadius: 22,            // Rounds the corners of the panel.
    borderWidth: 1,              // Adds a thin border around the panel.
    borderColor: "#dbeafe",      // Sets the border color to light blue.
    shadowColor: "#000000",      // Sets the shadow color.
    shadowOpacity: 0.06,         // Makes the shadow very light.
    shadowRadius: 10,            // Controls how soft/spread out the shadow is.
    elevation: 2,                // Adds shadow on Android devices.
  },

  // Style for the title text.
  title: {
    fontSize: 20,       // Sets the font size.
    fontWeight: "900",  // Makes the title bold.
    color: "#1d4ed8",   // Makes the title blue.
    marginBottom: 6,    // Adds space below the title.
  },

  // Style for the description text under the title.
  description: {      
    fontSize: 14,     // Sets the description text size.
    lineHeight: 21,   // Adds space between lines of text.
    color: "#64748b", // Uses a gray-blue text color.
    marginBottom: 14, // Adds space below the description.
  },

  // Style for the product search input box.
  input: {
    borderWidth: 1,             // Adds a border around the input.
    borderColor: "#bfdbfe",     // Sets the input border color.
    backgroundColor: "#f8fbff", // Gives the input a very light blue background.
    borderRadius: 14,           // Rounds the corners of the input.
    paddingVertical: 13,        // Adds vertical space inside the input.
    paddingHorizontal: 14,      // Adds left and right space inside the input.
    marginBottom: 12,           // Adds space below the input.
    color: "#0f172a",           // Sets the typed text color.
    fontSize: 15,               // Sets the typed text size.
  },

  // Style for the Find Cheapest button.
  button: {
    backgroundColor: "#2563eb", // Makes the button blue.
    padding: 14,                // Adds space inside the button.
    borderRadius: 14,           // Rounds the button corners.
    marginTop: 4,               // Adds space above the button.
  },
  
  // Style for the text inside the button.
  buttonText: {
    color: "#ffffff",    // Makes the button text white.
    textAlign: "center", // Centers the button text.
    fontWeight: "900",   // Makes the button text bold.
    fontSize: 15,        // Sets the button text size.
  },

  // Style for the box that shows the result.
  resultBox: {
    marginTop: 14,              // Adds space above the result box.
    padding: 14,                // Adds space inside the result box.
    backgroundColor: "#eff6ff", // Gives the result box a light blue background.
    borderRadius: 16,           // Rounds the result box corners.
    borderWidth: 1,             // Adds a border around the result box.
    borderColor: "#bfdbfe",     // Makes the result border light blue.
  },

  // Style for the "Best match" label.
  resultLabel: {
    color: "#1d4ed8",  // Makes the label blue.
    fontWeight: "900", // Makes the label bold.
    marginBottom: 5,   // Adds space below the label.
  },

  // Style for the store and price result text.
  resultText: {
    fontSize: 16,       // Sets the text size.
    fontWeight: "700",  // Makes the result text bold.
    color: "#0f172a",   // Makes the result text dark.
    marginBottom: 3,    // Adds space below each result line
  },
});
