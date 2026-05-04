import { useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { CameraView, useCameraPermissions } from "expo-camera";

type BarcodeScannerProps = {
  onScan: (barcode: string) => void;
  onClose: () => void;
};

export default function BarcodeScanner({
  onScan,
  onClose,
}: BarcodeScannerProps) {
  const [permission, requestPermission] = useCameraPermissions();
  const [scanned, setScanned] = useState(false);
  const [facing, setFacing] = useState<"front" | "back">("back");

  if (!permission) {
    return (
      <View style={styles.container}>
        <Text style={styles.message}>Checking camera permission...</Text>
      </View>
    );
  }

  if (!permission.granted) {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>Camera Access Needed</Text>

        <Text style={styles.message}>
          Savvy needs camera permission to scan product barcodes.
        </Text>

        <TouchableOpacity style={styles.primaryButton} onPress={requestPermission}>
          <Text style={styles.primaryButtonText}>Allow Camera</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.secondaryButton} onPress={onClose}>
          <Text style={styles.secondaryButtonText}>Close Scanner</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <View style={styles.cameraWrapper}>
      <View style={styles.header}>
        <Text style={styles.title}>Scan Barcode</Text>
        <Text style={styles.message}>
          Point your camera at the product barcode.
        </Text>
      </View>

      <CameraView
        style={styles.camera}
        facing={facing}
        barcodeScannerSettings={{
          barcodeTypes: ["ean13", "ean8", "upc_a", "upc_e", "code128"],
        }}
        onBarcodeScanned={
          scanned
            ? undefined
            : ({ data, type }) => {
                console.log("SCANNED:", type, data);
                alert(`Scanned: ${data}`);
                setScanned(true);
                onScan(data);
              }
        }
      />

      <View style={styles.buttonRow}>
        <TouchableOpacity
          style={styles.secondaryButton}
          onPress={() =>
            setFacing((prev) => (prev === "back" ? "front" : "back"))
          }
        >
          <Text style={styles.secondaryButtonText}>Flip Camera</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.closeButton} onPress={onClose}>
          <Text style={styles.closeButtonText}>Close</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 18,
    backgroundColor: "#ffffff",
    borderRadius: 22,
    borderWidth: 1,
    borderColor: "#dbeafe",
  },
  cameraWrapper: {
    width: "100%",
    overflow: "hidden",
    marginBottom: 10,
    backgroundColor: "#ffffff",
    borderRadius: 22,
    borderWidth: 1,
    borderColor: "#dbeafe",
  },
  header: {
    padding: 16,
    backgroundColor: "#eff6ff",
    borderBottomWidth: 1,
    borderBottomColor: "#dbeafe",
  },
  title: {
    fontSize: 20,
    fontWeight: "900",
    color: "#1d4ed8",
    marginBottom: 4,
  },
  message: {
    fontSize: 14,
    lineHeight: 21,
    color: "#64748b",
    marginBottom: 12,
  },
  camera: {
    height: 360,
    width: "100%",
    backgroundColor: "#000000",
  },
  buttonRow: {
    flexDirection: "row",
    gap: 10,
    padding: 14,
    backgroundColor: "#ffffff",
  },
  primaryButton: {
    backgroundColor: "#2563eb",
    paddingVertical: 13,
    paddingHorizontal: 16,
    borderRadius: 14,
    marginTop: 6,
  },
  primaryButtonText: {
    color: "#ffffff",
    textAlign: "center",
    fontWeight: "900",
  },
  secondaryButton: {
    flex: 1,
    backgroundColor: "#eff6ff",
    borderWidth: 1,
    borderColor: "#bfdbfe",
    paddingVertical: 13,
    paddingHorizontal: 16,
    borderRadius: 14,
  },
  secondaryButtonText: {
    color: "#1d4ed8",
    textAlign: "center",
    fontWeight: "900",
  },
  closeButton: {
    flex: 1,
    backgroundColor: "#2563eb",
    paddingVertical: 13,
    paddingHorizontal: 16,
    borderRadius: 14,
  },
  closeButtonText: {
    color: "#ffffff",
    textAlign: "center",
    fontWeight: "900",
  },
});