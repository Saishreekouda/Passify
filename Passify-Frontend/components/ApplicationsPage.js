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
import Navbar from "./Navbar";
import { SegmentedButtons } from 'react-native-paper';
import { useNavigation } from "@react-navigation/native";
const logo = require("../assets/Login_Image.png");
const applications = [
  {

    destination: "Civil Ls",
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
export default function ApplicationsPage({navigation}) {
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




      const handlePress = () => {
        console.log("hello")
        navigation.navigate("Outpass",{
          time: "10:00 am",
          destination: "Civs",
          transport: "Bus",
          status: "Pending",
          date: "12th May 2024",
          name: "John Doe",
          rollno: "IIT2021009",
          purpose:"Going Home",
          issueTime: "6 pm",
          issueDate: "12th May 2024",
          issuedBy: "Dean",
        })
      }

  return (
    <View style={styles.container}>
    <ScrollView style={{ paddingBottom: 20 }}>
      <View >
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
        <Pressable onPress={handlePress}>
          <Application
          key={index}
          destination={app.destination}
          time={app.time}
          status={app.status}
          date={app.date}
          name={app.name}
          rollno={app.rollno}
        />
        </Pressable>
        
      ))}
    </View>
    
  </ScrollView>
  <Navbar/>
  </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    paddingTop: 0,
  },

  title: {
    fontSize: 30,
    fontWeight: "bold",
    textAlign: "left",
    paddingVertical: 40,
    color: "#370556",
  },
});
