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
import { SegmentedButtons } from 'react-native-paper';

const logo = require("../assets/Login_Image.png");
const applications = [
  {
    destination: "Civil Lines",
    time: "10:00 am",
    status: "Pending",
    date: "12th May 2024",
  },
  {
    destination: "Civil Lines",
    time: "10:00 am",
    status: "Accepted",
    date: "12th May 2024",
  },
  {
    destination: "Civil Lines",
    time: "10:00 am",
    status: "Rejected",
    date: "12th May 2024",
  },
  {
    destination: "Civil Lines",
    time: "10:00 am",
    status: "Invalid",
    date: "12th May 2024",
  },
  // Add more application objects as needed
];
export default function ApplicationsPage() {

  const [value, setValue] = React.useState('upcoming');
  
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isStudentLogin, setIsStudentLogin] = useState(false);

  const filteredApplications =
  value === "upcoming"
    ? applications.filter(
        (app) => app.status === "Pending" || app.status === "Accepted"
      )
    : applications.filter(
        (app) => app.status === "Rejected" || app.status === "Invalid"
      );

  return (
    <View style={{ paddingBottom: 20 }}>
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>My Applications</Text>
      <View style={{ width: "100%", paddingLeft: 32, paddingRight: 32, paddingTop: 0 }}>
        <SegmentedButtons
          value={value}
          onValueChange={setValue}
          buttons={[
            { value: "upcoming", label: "Upcoming" },
            { value: "past", label: "Past" },
          ]}
        />
      </View>

      
      {filteredApplications.map((app, index) => (
        <Application
          key={index}
          destination={app.destination}
          time={app.time}
          status={app.status}
          date={app.date}
        />
      ))}
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
