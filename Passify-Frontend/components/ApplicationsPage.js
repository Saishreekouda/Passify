import React, { useState } from "react";
import {
  View,
  StyleSheet,
  Text,
  Pressable,
  ScrollView,
} from "react-native";
import Application from "./Application";
import Navbar from "./Navbar";
import { SegmentedButtons } from 'react-native-paper';
import { useNavigation } from "@react-navigation/native";

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
  const [value, setValue] = useState('upcoming');

  const filteredApplications =
  value === "upcoming"
    ? applications.filter(
        (app) => app.status === "Pending" || app.status === "Accepted"
      )
    : applications.filter(
        (app) => app.status === "Rejected" || app.status === "Invalid"
      );

  const handlePress = () => {
    console.log("hello");
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
    });
  };

  return (
    <View style={styles.container}>
      <ScrollView
        style={{}}
        showsVerticalScrollIndicator={false}
      >
        <View>
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
            <Pressable key={index} onPress={handlePress}>
              <Application
                destination={app.destination}
                time={app.time}
                status={app.status}
                date={app.date}
                name={app.name}
                rollno={app.rollno}
              />
            </Pressable>
          ))}
          <View style={styles.navbar}>
          <Navbar navigation={navigation}/>
          </View>
         
        </View>
         
      
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    padding: 0,
  },

  title: {
    fontSize: 30,
    fontWeight: "bold",
    textAlign: "left",
    paddingVertical: 40,
    marginLeft:32,
    color: "#370556",
  },
  navbar: {
    marginTop:210,
    width:400
  },
});
