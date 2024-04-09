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
// import Navbar from "./Navbar";
import Application from "./Application";
import { SegmentedButtons } from 'react-native-paper';
import AdminNavbar from "./AdminNavbar";
const logo = require("../assets/Login_Image.png");
const applications = [
    {
      destination: "Civil Lines",
      time: "10:00 am",
      status: "Pending",
      date: "12th May 2024",
      name: "John Doe",
      rollno: "IIT2021009",
    },
    {
      destination: "Civil Lines",
      time: "10:00 am",
      status: "Accepted",
      date: "12th May 2024",
      name: "John Doe",
      rollno: "IIT2021003",
    },
    {
      destination: "Civil Lines",
      time: "10:00 am",
      status: "Rejected",
      date: "12th May 2024",
      name: "John Doe",
      rollno: "IIT2021002",
    },
    {
      destination: "Civil Lines",
      time: "10:00 am",
      status: "Invalid",
      date: "12th May 2024",
      name: "John Doe",
      rollno: "IIT2021008",
    },
  ];
export default function Home() {

  const [value, setValue] = React.useState('pending');
  
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isStudentLogin, setIsStudentLogin] = useState(false);

  const filteredApplications =
  value === "pending"
    ? applications.filter(
        (app) => app.status === "Pending"
      )
    : applications.filter(
        (app) => app.status === "Rejected" || app.status === "Invalid" || app.status === "Accepted"
      );

  return (
    <ScrollView style={{ paddingBottom: 20 }}>
    <View contentContainerStyle={styles.container}>
      <Text style={styles.title}>My Applications</Text>
      <View style={{ width: "100%", paddingLeft: 32, paddingRight: 32, paddingTop: 0 }}>
        <SegmentedButtons
          value={value}
          onValueChange={setValue}
          buttons={[
            { value: "pending", label: "Pending" },
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
          name={app.name}
          rollno={app.rollno}
        />
      ))}
    </View>
    
  </ScrollView>
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
