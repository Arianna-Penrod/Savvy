import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import { useState } from "react";
import { user } from "@/data/demoUser";

type Props = {
  currentUser: user;
  onUpdate: (updatedUser: user) => void;
};

export default function UserProfileManager({ currentUser, onUpdate }: Props) {
  const [radius, setRadius] = useState(currentUser.radiusMiles.toString());
  const [list, setList] = useState(currentUser.list);

  const handleItemChange = (
    index: number,
    field: "name" | "quantity",
    value: string
  ) => {
    const updatedList = [...list];

    if (field === "quantity") {
      updatedList[index].quantity = parseInt(value) || 0;
    } else {
      updatedList[index].name = value;
    }

    setList(updatedList);
  };

  const addItem = () => {
    setList([...list, { name: "", quantity: 1 }]);
  };

  const removeItem = (index: number) => {
    const updatedList = list.filter((_, i) => i !== index);
    setList(updatedList);
  };

  const handleSave = () => {
    const updatedUser = {
      ...currentUser,
      radiusMiles: parseFloat(radius),
      list,
    };

    onUpdate(updatedUser);
    alert("Profile saved!");
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Shopping Preferences</Text>

      <View style={styles.infoPill}>
        <Text style={styles.infoPillText}>User ID: {currentUser.userID}</Text>
      </View>

      <Text style={styles.label}>Search Radius in Miles</Text>
      <TextInput
        style={styles.input}
        value={radius}
        onChangeText={setRadius}
        keyboardType="numeric"
        placeholder="Example: 10"
        placeholderTextColor="#94a3b8"
      />

      <Text style={styles.subtitle}>Shopping List</Text>

      {list.map((item, index) => (
        <View key={index} style={styles.row}>
          <TextInput
            style={styles.itemInput}
            value={item.name}
            placeholder="Item"
            placeholderTextColor="#94a3b8"
            onChangeText={(text) => handleItemChange(index, "name", text)}
          />

          <TextInput
            style={styles.quantityInput}
            value={item.quantity.toString()}
            placeholder="Qty"
            placeholderTextColor="#94a3b8"
            keyboardType="numeric"
            onChangeText={(text) => handleItemChange(index, "quantity", text)}
          />

          <TouchableOpacity
            style={styles.removeButton}
            onPress={() => removeItem(index)}
          >
            <Text style={styles.removeButtonText}>×</Text>
          </TouchableOpacity>
        </View>
      ))}

      <TouchableOpacity style={styles.secondaryButton} onPress={addItem}>
        <Text style={styles.secondaryButtonText}>Add Item</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.primaryButton} onPress={handleSave}>
        <Text style={styles.primaryButtonText}>Save Profile</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 18,
    backgroundColor: "#ffffff",
    borderRadius: 22,
    borderWidth: 1,
    borderColor: "#dbeafe",
    shadowColor: "#000000",
    shadowOpacity: 0.06,
    shadowRadius: 10,
    elevation: 2,
  },
  title: {
    fontSize: 21,
    fontWeight: "900",
    color: "#1d4ed8",
    marginBottom: 10,
  },
  infoPill: {
    alignSelf: "flex-start",
    backgroundColor: "#eff6ff",
    borderWidth: 1,
    borderColor: "#bfdbfe",
    paddingVertical: 7,
    paddingHorizontal: 12,
    borderRadius: 999,
    marginBottom: 14,
  },
  infoPillText: {
    color: "#1e3a8a",
    fontWeight: "800",
  },
  label: {
    color: "#1e3a8a",
    fontWeight: "800",
    marginBottom: 7,
  },
  subtitle: {
    marginTop: 14,
    marginBottom: 10,
    fontSize: 17,
    fontWeight: "900",
    color: "#0f172a",
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    marginBottom: 10,
  },
  input: {
    borderWidth: 1,
    borderColor: "#bfdbfe",
    backgroundColor: "#f8fbff",
    borderRadius: 14,
    paddingVertical: 12,
    paddingHorizontal: 14,
    marginBottom: 10,
    color: "#0f172a",
  },
  itemInput: {
    flex: 1,
    borderWidth: 1,
    borderColor: "#bfdbfe",
    backgroundColor: "#f8fbff",
    borderRadius: 14,
    paddingVertical: 12,
    paddingHorizontal: 14,
    color: "#0f172a",
  },
  quantityInput: {
    width: 75,
    borderWidth: 1,
    borderColor: "#bfdbfe",
    backgroundColor: "#f8fbff",
    borderRadius: 14,
    paddingVertical: 12,
    paddingHorizontal: 14,
    color: "#0f172a",
  },
  removeButton: {
    width: 42,
    height: 42,
    borderRadius: 21,
    backgroundColor: "#dbeafe",
    justifyContent: "center",
    alignItems: "center",
  },
  removeButtonText: {
    color: "#1d4ed8",
    fontSize: 24,
    fontWeight: "900",
    lineHeight: 26,
  },
  secondaryButton: {
    backgroundColor: "#eff6ff",
    borderWidth: 1,
    borderColor: "#bfdbfe",
    paddingVertical: 13,
    borderRadius: 14,
    marginTop: 8,
  },
  secondaryButtonText: {
    color: "#1d4ed8",
    textAlign: "center",
    fontWeight: "900",
  },
  primaryButton: {
    backgroundColor: "#2563eb",
    paddingVertical: 14,
    borderRadius: 14,
    marginTop: 10,
  },
  primaryButtonText: {
    color: "#ffffff",
    textAlign: "center",
    fontWeight: "900",
  },
});