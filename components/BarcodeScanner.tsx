import { useState } from "react";
import { View, Text, Button, StyleSheet } from "react-native";
import { CameraView, useCameraPermissions } from "expo-camera";

type BarcodeScannerProps = {
  onScan: (barcode: string) => void; // callback to handle scanned barcode
  onClose: () => void; // callback to close the scanner
};

export default function BarcodeScanner({ onScan, onClose }: BarcodeScannerProps) {
  const [permission, requestPermission] = useCameraPermissions(); // secure camera permissions
  const [scanned, setScanned] = useState(false); // state to prevent multiple scans

  if (!permission) {
    return <Text>Checking camera permission...</Text>; 
  }

  if (!permission.granted) { // if permission is not granted, show button to request it
    return (
      <View style={styles.container}>
        <Text>Camera permission is needed to scan barcodes.</Text>
        <Button title="Allow Camera" onPress={requestPermission} />
        <Button title="Close Scanner" onPress={onClose} />
      </View>
    );
  }

  return ( // show camera view to scan barcodes
    <View style={styles.container}>
      <Text style={styles.title}>Scan Barcode</Text>

      <CameraView
        style={styles.camera}
        facing="back"
        barcodeScannerSettings={{
          barcodeTypes: ["ean13", "ean8", "upc_a", "upc_e", "code128"],
        }}
        onBarcodeScanned={
          scanned
            ? undefined
            : ({ data }) => {
                setScanned(true);
                onScan(data);
              }
        }
      />

      <Button title="Close Scanner" onPress={onClose} />
    </View>
  );
}

const styles = StyleSheet.create({ // basic styles for the scanner UI
  container: {
    padding: 15,
    backgroundColor: "#eeeeee",
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
  },
  camera: {
    height: 300,
    width: "100%",
    marginBottom: 10,
  },
});