import MapView, { Marker } from "react-native-maps";

type Region = {
    latitude: number;
    longitude: number;
    latitudeDelta: number;
    longitudeDelta: number;
};

type Store = {
    name: string;
    geometry: { location: { lat: number; lng: number } };
};

export default function StoreMap({
    region,
    stores,
}: {
    region: Region;
    stores: Store[];
}) {
    return (
        <MapView style={{ flex: 1 }} region={region}>
            {/* User Marker */}
            <Marker
                coordinate={{ latitude: region.latitude, longitude: region.longitude }}
                title="You are here"
                pinColor="blue"
            />

            {/* Store Markers */}
            {stores.map((store, index) => (
                <Marker
                    key={index}
                    coordinate={{
                        latitude: store.geometry.location.lat,
                        longitude: store.geometry.location.lng,
                    }}
                    title={store.name}
                />
            ))}
        </MapView>
    );
}