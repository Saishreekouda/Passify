import React, { useState } from "react";
import {
  Alert,
  Image,
  Pressable,
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  View,
  Switch,
  ScrollView,
} from "react-native";
import Application from "./Application";
const logo = require("../assets/Login_Image.png");

export default function ApplicationsPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isStudentLogin, setIsStudentLogin] = useState(false);

  return (
    <View style={{ paddingBottom: 20 }}>
      <ScrollView contentContainerStyle={styles.container}>
        <Text style={styles.title}>My Applications</Text>
        <Application
          destination={"Civil Lines"}
          time={"10:00 am"}
          status={"Pending"}
          date={"12th May 2024"}
        />
        <Application
          destination={"Civil Lines"}
          time={"10:00 am"}
          status={"Accepted"}
          date={"12th May 2024"}
        />
        <Application
          destination={"Civil Lines"}
          time={"10:00 am"}
          status={"Rejected"}
          date={"12th May 2024"}
        />
        <Application
          destination={"Civil Lines"}
          time={"10:00 am"}
          status={"Invalid"}
          date={"12th May 2024"}
        />
        <Application
          destination={"Civil Lines"}
          time={"10:00 am"}
          status={"Invalid"}
          date={"12th May 2024"}
        />
        <Application
          destination={"Civil Lines"}
          time={"10:00 am"}
          status={"Invalid"}
          date={"12th May 2024"}
        />
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    paddingTop: 48,
  },

  title: {
    fontSize: 30,
    fontWeight: "bold",
    textAlign: "left",
    paddingVertical: 40,
    color: "#370556",
  },
});
