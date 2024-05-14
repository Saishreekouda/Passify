import React, { useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { CameraView, useCameraPermissions } from "expo-camera";
import { Button } from "react-native-paper";

export default function App() {
  const [facing, setFacing] = useState("back");
  const [isOpen, setIsOpen] = useState(false);
  const [scannedText, setScannedText] = useState("Hello");
  const [permission, requestPermission] = useCameraPermissions();

  if (!permission) {
    // Camera permissions are still loading.
    return <View />;
  }

  if (!permission.granted) {
    // Camera permissions are not granted yet.
    return (
      <View style={styles.container}>
        <Text style={styles.text}>
          We need your permission to use the camera
        </Text>
        <TouchableOpacity style={styles.button} onPress={requestPermission}>
          <Text style={styles.buttonText}>Grant Permission</Text>
        </TouchableOpacity>
      </View>
    );
  }

  const handleScan = ({ data }) => {
    setScannedText(data);
    setIsOpen(false); // Close the camera after scanning
  };

  const toggleCamera = () => {
    setIsOpen((prev) => !prev); // Toggle camera open/close
    setScannedText("Hello"); // Reset scanned text when opening camera
  };

  return (
    <View style={styles.container}>
      {isOpen ? (
        <CameraView
          barcodeScannerSettings={{
            barcodeTypes: ["qr"],
          }}
          style={styles.camera}
          facing={facing}
          onBarcodeScanned={handleScan}
        >
          <TouchableOpacity style={styles.toggleButton} onPress={toggleCamera}>
            <Text style={styles.buttonText}> Close Camera</Text>
          </TouchableOpacity>
        </CameraView>
      ) : (
        <View>
          <Button style={styles.toggleButton} onPress={toggleCamera}>
            <Text style={styles.buttonText}> Open Camera </Text>
          </Button>
          <Text style={styles.text}>{scannedText}</Text>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#FFF",
  },
  camera: {
    width: "100%",
    height: "100%",
  },
  text: {
    color: "#000",
  },
  button: {
    padding: 10,
    backgroundColor: "#007BFF",
    borderRadius: 5,
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
  toggleButton: {
    position: "absolute",
    bottom: 20,
    alignSelf: "center",
    backgroundColor: "#007BFF",
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 5,
  },
});
