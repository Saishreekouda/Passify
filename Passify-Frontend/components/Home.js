import { StatusBar } from "expo-status-bar";
import { useState } from "react";
import { Image, StyleSheet, Text, View, ScrollView } from "react-native";
import { Button, TextInput } from "react-native-paper";
import Splash from "./Splash";
import Login from "./Login";
import { Alert } from "react-native";

import home from "../assets/home.png";
import { useNavigation } from "@react-navigation/native";
import Navbar from "./Navbar";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Home() {
  const navigation = useNavigation();
  const [formData, setFormData] = useState({
    name: "",
    outDate: "",
    destination: "",
    transport: "",
    outTime: "",
    issuedBy: "",
  });
  const handleInputChange = (field, value) => {
    setFormData({ ...formData, [field]: value });
  };

  const handleSubmit = () => {
    console.log("Submitted:", formData);

    setFormData({
      destination: "",
      outDate: "",
      outTime: "",
      transport: "",
      purpose: "",
    });

    navigation.navigate("ApplicationsPage");
  };

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollViewContent}>
        <Text style={styles.title}>Create New Outpass</Text>

        <Image source={home} style={styles.image} />

        <View style={styles.inputView}>
          <TextInput
            style={styles.input}
            placeholder="Date of Event"
            value={formData.outDate}
            onChangeText={(text) => handleInputChange("outDate", text)}
            left={<TextInput.Icon icon="calendar" />}
          />

          <TextInput
            style={styles.input}
            placeholder="Destination"
            value={formData.destination}
            onChangeText={(text) => handleInputChange("destination", text)}
            left={<TextInput.Icon icon="map-marker" />}
          />
          <TextInput
            style={styles.input}
            placeholder="Transport"
            value={formData.transport}
            onChangeText={(text) => handleInputChange("transport", text)}
            left={<TextInput.Icon icon="car" />}
          />

          <TextInput
            style={styles.input}
            placeholder="Out Time"
            value={formData.outTime}
            onChangeText={(text) => handleInputChange("outTime", text)}
            left={<TextInput.Icon icon="clock" />}
          />
          <TextInput
            style={styles.input}
            placeholder="Name"
            value={formData.name}
            onChangeText={(text) => handleInputChange("name", text)}
            left={<TextInput.Icon icon="account" />}
          />

          <Button mode="contained" onPress={handleSubmit} style={styles.button}>
            Submit
          </Button>
        </View>
      </ScrollView>

      <Navbar />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  scrollViewContent: {
    flexGrow: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingTop: StatusBar.currentHeight,
  },
  image: {
    marginTop: 0,
    width: 200,
    height: 200,
  },
  title: {
    fontSize: 20,
    marginTop: 0,
    fontWeight: "bold",
    color: "#370556",
  },
  input: {
    marginTop: 2,
    marginBottom: 2,
  },
  inputView: {
    width: "70%",
  },
  button: {
    marginTop: 20,
  },
});
