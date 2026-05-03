import { useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { BrowserMultiFormatReader } from "@zxing/browser";

type BarcodeUploadProps = {
  onScan: (barcode: string) => void;
};

export default function BarcodeUpload({ onScan }: BarcodeUploadProps) {
  const [message, setMessage] = useState("");

  const handleUpload = async () => {
    const input = document.createElement("input");
    input.type = "file";
    input.accept = "image/*";

    input.onchange = async () => {
      const file = input.files?.[0];

      if (!file) return;

      try {
        setMessage("Reading barcode...");

        const imageUrl = URL.createObjectURL(file);
        const reader = new BrowserMultiFormatReader();

        const result = await reader.decodeFromImageUrl(imageUrl);

        URL.revokeObjectURL(imageUrl);

        const barcode = result.getText();

        setMessage(`Found barcode: ${barcode}`);
        onScan(barcode);
      } catch (error) {
        setMessage("Could not read barcode. Try a clearer image.");
      }
    };

    input.click();
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.uploadButton} onPress={handleUpload}>
        <Text style={styles.uploadButtonText}>Upload Barcode Image</Text>
      </TouchableOpacity>

      {message ? <Text style={styles.message}>{message}</Text> : null}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 10,
  },
  uploadButton: {
    backgroundColor: "#eff6ff",
    borderWidth: 1,
    borderColor: "#bfdbfe",
    paddingVertical: 13,
    paddingHorizontal: 16,
    borderRadius: 14,
  },
  uploadButtonText: {
    color: "#1d4ed8",
    textAlign: "center",
    fontWeight: "900",
  },
  message: {
    marginTop: 10,
    color: "#475569",
    fontWeight: "700",
    textAlign: "center",
  },
});