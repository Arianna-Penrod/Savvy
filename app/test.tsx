import { Text, View } from "react-native";

export default function Index() {
  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Text>The landing page is here</Text>
      <View style={{ height: 20 }} />
    </View>
  );
}
