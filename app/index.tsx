import { Text, View } from "react-native";

const GOOGLE_API_KEY = AIzaSyCnjvFaIkRg6peTExxw3ARtnD61LRFcMP4;

async function getNearbyStores(lat, lng) {
  const url = `https://maps.googleapis.com/maps/api/place/nearbysearch/json
  ?location=${lat},${lng}
  &radius=2000
  &type=supermarket
  &key=${GOOGLE_API_KEY}`;

  const res = await fetch(url);
  const data = await res.json();
  return data.results;
}

export default function Index() {
  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Text>This will be the landing page of our app! Yippee</Text>
      <Text>Will this work idkkkk</Text>
      <View style={{ height: 20 }} />
      <Text>
        This can be the page that shows the user a list of items near them? 
      </Text>
    </View>
  );

}
