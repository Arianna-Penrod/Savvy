import { Modal, View, Text, TouchableOpacity, StyleSheet } from "react-native";

type Props = {
  visible: boolean;
  onAllow: () => void;
  onNotNow: () => void;
};

export default function LocationPermissionModal({
  visible,
  onAllow,
  onNotNow,
}: Props) {
  return (
    <Modal visible={visible} transparent animationType="fade">
      <View style={styles.overlay}>
        <View style={styles.card}>
          <View style={styles.iconCircle}>
            <Text style={styles.emoji}>📍</Text>
          </View>

          <Text style={styles.title}>Find nearby deals</Text>

          <Text style={styles.description}>
            Savvy uses your location to find stores near you and compare prices
            on groceries and essentials.
          </Text>

          <TouchableOpacity style={styles.primaryButton} onPress={onAllow}>
            <Text style={styles.primaryButtonText}>Use My Location</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.secondaryButton} onPress={onNotNow}>
            <Text style={styles.secondaryButtonText}>Not Now</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: "rgba(15, 23, 42, 0.55)",
    justifyContent: "center",
    alignItems: "center",
    padding: 24,
  },
  card: {
    width: "100%",
    maxWidth: 420,
    backgroundColor: "#ffffff",
    borderRadius: 28,
    padding: 26,
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#dbeafe",
    shadowColor: "#000000",
    shadowOpacity: 0.14,
    shadowRadius: 18,
    elevation: 6,
  },
  iconCircle: {
    width: 66,
    height: 66,
    borderRadius: 33,
    backgroundColor: "#eff6ff",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 14,
    borderWidth: 1,
    borderColor: "#bfdbfe",
  },
  emoji: {
    fontSize: 34,
  },
  title: {
    fontSize: 24,
    fontWeight: "900",
    color: "#0f172a",
    marginBottom: 8,
    textAlign: "center",
  },
  description: {
    fontSize: 15,
    color: "#64748b",
    textAlign: "center",
    lineHeight: 22,
    marginBottom: 24,
  },
  primaryButton: {
    backgroundColor: "#2563eb",
    paddingVertical: 14,
    paddingHorizontal: 24,
    borderRadius: 16,
    width: "100%",
    alignItems: "center",
    marginBottom: 12,
  },
  primaryButtonText: {
    color: "#ffffff",
    fontSize: 16,
    fontWeight: "800",
  },
  secondaryButton: {
    paddingVertical: 10,
    paddingHorizontal: 16,
  },
  secondaryButtonText: {
    color: "#1d4ed8",
    fontSize: 15,
    fontWeight: "800",
  },
});