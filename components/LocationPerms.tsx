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
          <Text style={styles.emoji}>📍</Text>

          <Text style={styles.title}>Find nearby deals</Text>

          <Text style={styles.description}>
            Savvy uses your location to find stores near you and compare prices
            on groceries and essentials.
          </Text>

          <TouchableOpacity style={styles.primaryButton} onPress={onAllow}>
            <Text style={styles.primaryButtonText}>Use My Location</Text>
          </TouchableOpacity>

          <TouchableOpacity onPress={onNotNow}>
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
    backgroundColor: "rgba(0, 0, 0, 0.45)",
    justifyContent: "center",
    alignItems: "center",
    padding: 24,
  },
  card: {
    width: "100%",
    backgroundColor: "white",
    borderRadius: 24,
    padding: 24,
    alignItems: "center",
  },
  emoji: {
    fontSize: 42,
    marginBottom: 12,
  },
  title: {
    fontSize: 22,
    fontWeight: "700",
    marginBottom: 8,
    textAlign: "center",
  },
  description: {
    fontSize: 15,
    color: "#555",
    textAlign: "center",
    lineHeight: 22,
    marginBottom: 24,
  },
  primaryButton: {
    backgroundColor: "#2F80ED",
    paddingVertical: 14,
    paddingHorizontal: 24,
    borderRadius: 14,
    width: "100%",
    alignItems: "center",
    marginBottom: 14,
  },
  primaryButtonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "700",
  },
  secondaryButtonText: {
    color: "#666",
    fontSize: 15,
    fontWeight: "500",
  },
});