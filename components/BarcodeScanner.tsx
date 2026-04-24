import { View, Button, Text } from "react-native";

type BarcodeScannerProps = {
  onScan: (barcode: string) => void;
  onClose: () => void;
};

export default function BarcodeScanner({ onScan, onClose }: BarcodeScannerProps) {
  const handleFakeScan = () => {
    const fakeBarcode = "012345678905";
    onScan(fakeBarcode); 
  };

  return (
    <View style={{ padding: 15, backgroundColor: "#eeeeee" }}>
      <Text style={{ fontSize: 18, fontWeight: "bold", marginBottom: 10 }}>
        Barcode Scanner
      </Text>

      <Button title="Simulate Barcode Scan" onPress={handleFakeScan} />

      <View style={{ marginTop: 10 }}>
        <Button title="Close Scanner" onPress={onClose} />
      </View>
    </View>
  );
}