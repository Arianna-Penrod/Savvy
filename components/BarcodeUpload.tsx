import { useState } from "react";
import { View, Text, Button } from "react-native";
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
    <View style={{ padding: 10 }}>
      <Button title="Upload Barcode Image" onPress={handleUpload} />
      {message && <Text>{message}</Text>}
    </View>
  );
}