import React, { useState , useCallback} from "react";
import { View, Text, TouchableOpacity, StyleSheet, Pressable } from "react-native";
import { CameraView, useCameraPermissions } from "expo-camera";
import { Button } from "react-native-paper";
import Application from "./Application";
import { get } from "react-native/Libraries/TurboModule/TurboModuleRegistry";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation, useFocusEffect } from "@react-navigation/native";
import axios from "axios";

export default function App() {
  const navigation = useNavigation();

  const [facing, setFacing] = useState("back");
  const [isOpen, setIsOpen] = useState(false);
  const [role, setRole] = useState("");
  const [scannedText, setScannedText] = useState("Hello");
  const [permission, requestPermission] = useCameraPermissions();
  const [outpassData, setOutpassData] = useState(null);
  const [loading, setLoading] = useState(false);

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
    fetchOutpass(data);
  };

  const toggleCamera = () => {
    setIsOpen((prev) => !prev); // Toggle camera open/close
    setScannedText("Hello"); // Reset scanned text when opening camera
  };

  const handlePress = () => {
    navigation.navigate("Outpass", {
      ...outpassData,
      name: outpassData.student.name,
      rollno: outpassData.student.rollNumber,
    });
  };

  
  const fetchOutpass = async (scannedText) => {
    const { role: retrievedRole, token } = await retrieveGuardLogin();
    if (retrievedRole && token) {
      try {
        setRole(retrievedRole);
        const response = await axios.get(
          `${process.env.EXPO_PUBLIC_API_URL}/outpass/${scannedText}`,
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setOutpassData(response.data.data);
      } catch (error) {
        console.error("Error fetching applications:", error);
      } finally {
      }
    }
  };

  const retrieveGuardLogin = async () => {
    try {
      const role = await AsyncStorage.getItem("role");
      const token = await AsyncStorage.getItem("token");
      return { role, token };
    } catch (error) {
      console.error(error);
      return { role: null, token: null };
    }
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
        
          {/* <Text style={styles.text}>{scannedText}</Text> */}
          {outpassData && 
          <Pressable onPress={handlePress}>
          <Application {...outpassData} />
          </Pressable>
          } 
          
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
