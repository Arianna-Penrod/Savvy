import { View, Text, TextInput, Button, StyleSheet } from "react-native";
import { useState } from "react";
import { user } from "@/data/demoUser";

type Props = {
  currentUser: user;
  onUpdate: (updatedUser: user) => void;
};

export default function UserProfileManager({ currentUser, onUpdate }: Props) {
  const [radius, setRadius] = useState(currentUser.radiusMiles.toString());
  const [list, setList] = useState(currentUser.list);

  const handleItemChange = (index: number, field: "name" | "quantity", value: string) => {
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
      list: list,
    };

    onUpdate(updatedUser);
    alert("Profile saved!");
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>User Profile</Text>

      <Text>User ID: {currentUser.userID}</Text>

      {/* Radius */}
      <Text style={styles.label}>Search Radius (miles)</Text>
      <TextInput
        style={styles.input}
        value={radius}
        onChangeText={setRadius}
        keyboardType="numeric"
      />

      {/* Shopping List */}
      <Text style={styles.subtitle}>Shopping List:</Text>

      {list.map((item, index) => (
        <View key={index} style={styles.row}>
          <TextInput
            style={styles.inputSmall}
            value={item.name}
            placeholder="Item"
            onChangeText={(text) => handleItemChange(index, "name", text)}
          />

          <TextInput
            style={styles.inputSmall}
            value={item.quantity.toString()}
            keyboardType="numeric"
            onChangeText={(text) => handleItemChange(index, "quantity", text)}
          />

          <Button title="X" onPress={() => removeItem(index)} />
        </View>
      ))}

      <Button title="Add Item" onPress={addItem} />

      <View style={{ marginTop: 10 }}>
        <Button title="Save Profile" onPress={handleSave} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { padding: 16, backgroundColor: "#fff" },
  title: { fontSize: 20, fontWeight: "bold", marginBottom: 10 },
  subtitle: { marginTop: 10, fontWeight: "bold" },
  label: { marginTop: 10 },
  row: { flexDirection: "row", alignItems: "center", gap: 8 },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 8,
    marginBottom: 10,
  },
  inputSmall: {
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 6,
    width: 100,
    marginRight: 5,
  },
});