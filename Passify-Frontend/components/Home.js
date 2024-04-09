import { StatusBar } from "expo-status-bar";

import { useState } from "react";
import { Image, StyleSheet, Text, View, ScrollView } from "react-native";
import { Button, TextInput } from "react-native-paper";
import home from "./assets/home.png";

export default function Home() {
  const [formData, setFormData] = useState({
    name: "",
    rollno: "",
    semester: "",
    date: "",
    destination: "",
    transport: "",
    nowTime: "",
    outTime: "",
    issuedBy: "",
  });
  const handleInputChange = (field, value) => {
    setFormData({ ...formData, [field]: value });
  };
  const handleSubmit = () => {
    if (
      !formData.dateOfEvent.trim() ||
      !formData.destination.trim() ||
      !formData.transport.trim() ||
      !formData.nowTime.trim() ||
      !formData.outTime.trim() ||
      !formData.issuedBy.trim() ||
      !formData.username.trim() ||
      !formData.password.trim()
    ) {
      Alert.alert("Error", "Please fill in all fields");
      return;
    }

    console.log("Submitted:", formData);

    setFormData({
      dateOfEvent: "",
      destination: "",
      transport: "",
      outTime: "",
      issuedBy: "",
    });
  };

  return (
    <>
      <ScrollView contentContainerStyle={styles.container}>
        <Text style={styles.title}>Create New Outpass</Text>

        <Image source={home} style={styles.image} />

        <View style={styles.inputView}>
          <TextInput
            style={styles.input}
            placeholder="Name"
            value={formData.name}
            onChangeText={(text) => handleInputChange("name", text)}
            left={<TextInput.Icon icon="account" />}
          />
          <TextInput
            style={styles.input}
            placeholder="Date of Event"
            value={formData.dateOfEvent}
            onChangeText={(text) => handleInputChange("dateOfEvent", text)}
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
            placeholder="Issued By"
            value={formData.issuedBy}
            onChangeText={(text) => handleInputChange("issuedBy", text)}
            left={<TextInput.Icon icon="office-building" />}
          />
        </View>
        <Button mode="contained" onPress={handleSubmit} style={styles.button}>
          Submit
        </Button>
      </ScrollView>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
    paddingTop: StatusBar.currentHeight,
  },
  image: {
    width: 200,
    height: 200,
  },
  title: {
    fontSize: 20,
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
  button:{
    marginTop: 20,
  }
});
