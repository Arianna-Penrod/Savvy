import { View, Text, TextInput, Button, StyleSheet } from "react-native";
import { useState } from "react";
import { user } from "@/demoUser";

type Props = {
  currentUser: user;
  onUpdate: (updatedUser: user) => void;
};

export default function UserProfileManager({ currentUser, onUpdate }: Props) {
  const [radius, setRadius] = useState(currentUser.radiusMiles.toString());

  const handleSave = () => {
    const updatedUser = {
      ...currentUser,
      radiusMiles: parseFloat(radius),
    };
    onUpdate(updatedUser);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>User Profile</Text>

      <Text>User ID: {currentUser.userID}</Text>

      <Text style={styles.label}>Search Radius (miles)</Text>
      <TextInput
        style={styles.input}
        value={radius}
        onChangeText={setRadius}
        keyboardType="numeric"
      />

      <Button title="Save Preferences" onPress={handleSave} />

      <Text style={styles.subtitle}>Shopping List:</Text>
      {currentUser.list.map((item, index) => (
        <Text key={index}>
          {item.name} (x{item.quantity})
        </Text>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { padding: 16, backgroundColor: "#fff" },
  title: { fontSize: 20, fontWeight: "bold", marginBottom: 10 },
  subtitle: { marginTop: 10, fontWeight: "bold" },
  label: { marginTop: 10 },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 8,
    marginBottom: 10,
  },
});