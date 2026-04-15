import { View, Text, StyleSheet } from "react-native";

type Props = {
  message: string;
};

export default function ScreenMessage({ message }: Props) {
  return (
    <View style={styles.center}>
      <Text>{message}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  center: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});