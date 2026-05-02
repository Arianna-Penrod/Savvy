import { useState } from "react";
import { View, Text, StyleSheet } from "react-native";

import AppLayout from "@/components/AppLayout";
import UserProfileManager from "@/components/UserProfileManager";
import { users } from "@/data/demoUser";

export default function ListPage() {
  const [currentUser, setCurrentUser] = useState(users[0]);

  return (
    <AppLayout
      title="My Needed Items"
      subtitle="Add or update the items you need before comparing store prices."
      >
      <UserProfileManager
        currentUser={currentUser}
        onUpdate={setCurrentUser}
      />
    </AppLayout>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#ffffff",
    padding: 18,
    borderRadius: 22,
    marginBottom: 18,
    borderWidth: 1,
    borderColor: "#dbeafe",
    shadowColor: "#000000",
    shadowOpacity: 0.06,
    shadowRadius: 10,
    elevation: 2,
  },
  heading: {
    fontSize: 22,
    fontWeight: "900",
    color: "#1d4ed8",
    marginBottom: 8,
  },
  sectionTitle: {
    fontSize: 19,
    fontWeight: "900",
    color: "#1d4ed8",
    marginBottom: 8,
  },
  paragraph: {
    fontSize: 15,
    lineHeight: 22,
    color: "#64748b",
  },
  storeName: {
    fontSize: 18,
    fontWeight: "800",
    color: "#0f172a",
    marginBottom: 4,
  },
  button: {
    marginTop: 16,
    backgroundColor: "#2563eb",
    padding: 14,
    borderRadius: 14,
  },
  buttonText: {
    color: "#ffffff",
    fontWeight: "900",
    textAlign: "center",
  },
  mapBox: {
    height: 380,
    borderRadius: 16,
    overflow: "hidden",
    marginTop: 10,
  },
});