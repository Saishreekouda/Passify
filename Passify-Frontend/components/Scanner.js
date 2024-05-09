import React, { useState, useEffect } from "react";
import { Text, View, StyleSheet } from "react-native";
import { Button } from "react-native-paper";
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
            <View
              style={{
                flex: 1,
                justifyContent: "flex-end",
                alignItems: "center",
                paddingBottom: 20,
              }}
            >
              <Button mode="contained" onPress={toggleCamera}>
                Close Camera
              </Button>
            </View>
          </Camera>
        </View>
      ) : (
        <View
          style={{
            flex: 1,
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Button mode="contained" title="Open Camera" onPress={toggleCamera}>
            Open Camera
          </Button>
        </View>
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
    justifyContent: "center",
    alignContent: "center",
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
