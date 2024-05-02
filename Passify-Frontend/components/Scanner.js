import React, { useState, useEffect } from "react";
import { Text, View, StyleSheet, Button } from "react-native";
import { Camera } from "expo-camera";
import { useFocusEffect } from "@react-navigation/native";

export default function App({ navigation }) {
  const [hasPermission, setHasPermission] = useState(null);
  const [cameraOpen, setCameraOpen] = useState(false);
  const [scannedData, setScannedData] = useState(null);

  const handleBarCodeScanned = ({ type, data }) => {
    setScannedData(`Outpass ID: ${data}`);
    setCameraOpen(false);
  };

  const getCameraPermission = async () => {
    const { status } = await Camera.requestCameraPermissionsAsync();
    setHasPermission(status === "granted");
  };

  useEffect(() => {
    getCameraPermission();
  }, []);

  useFocusEffect(
    React.useCallback(() => {
      // Refresh camera permissions and reset camera state on focus
      getCameraPermission();
      setCameraOpen(false);
      setScannedData(null);
    }, [])
  );

  const toggleCamera = () => {
    setCameraOpen((prev) => !prev);
    setScannedData(null);
  };

  if (hasPermission === null) {
    return <View />;
  }
  if (hasPermission === false) {
    return (
      <View style={styles.container}>
        <Text>No access to camera</Text>
        <Button
          title="Grant Permission"
          onPress={() => {
            getCameraPermission();
          }}
        />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {cameraOpen ? (
        <View style={{ flex: 1 }}>
          <Camera
            style={{ flex: 1 }}
            type={Camera.Constants.Type.back}
            onBarCodeScanned={handleBarCodeScanned}
          >
            <Button title="Close Camera" onPress={toggleCamera} />
          </Camera>
        </View>
      ) : (
        <Button title="Open Camera" onPress={toggleCamera} />
      )}
      {scannedData && (
        <View style={styles.dataContainer}>
          <Text style={styles.dataText}>{scannedData}</Text>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "100%",
    height: "100%",
  },
  dataContainer: {
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    padding: 20,
    borderRadius: 10,
    marginTop: 20,
  },
  dataText: {
    fontSize: 18,
    color: "#fff",
  },
});
