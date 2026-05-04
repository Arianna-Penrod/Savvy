import { View, Text, StyleSheet } from "react-native";

type Props = {
  message: string;
};

export default function ScreenMessage({ message }: Props) {
  return (
    <View style={styles.wrapper}>
      <View style={styles.card}>
        <View style={styles.iconCircle}>
          <Text style={styles.icon}>ℹ️</Text>
        </View>

        <Text style={styles.message}>{message}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    padding: 18,
    backgroundColor: "#f8fbff",
  },
  card: {
    backgroundColor: "#ffffff",
    borderRadius: 22,
    padding: 20,
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#dbeafe",
    shadowColor: "#000000",
    shadowOpacity: 0.06,
    shadowRadius: 10,
    elevation: 2,
  },
  iconCircle: {
    width: 52,
    height: 52,
    borderRadius: 26,
    backgroundColor: "#eff6ff",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 10,
    borderWidth: 1,
    borderColor: "#bfdbfe",
  },
  icon: {
    fontSize: 24,
  },
  message: {
    fontSize: 15,
    lineHeight: 22,
    color: "#475569",
    textAlign: "center",
    fontWeight: "700",
  },
});