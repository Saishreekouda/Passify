import React, { useState, useEffect } from "react";
import {
  View,
  StyleSheet,
  Text,
  Pressable,
  ScrollView,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Application from "./Application";
import Navbar from "./Navbar";
import axios from "axios";
import { SegmentedButtons } from 'react-native-paper';
import { useNavigation } from "@react-navigation/native";
const logo = require("../assets/Login_Image.png");

export default function ApplicationsPage({ navigation }) {
  const [applications, setApplications] = useState([]);
  const [value, setValue] = useState("upcoming");
  const [id, setId] = useState(0);
  const [sname, setName] = useState("");
  const [rollno, setRollno] = useState("");
  const retrieveStudentLogin = async () => {
    try {
      console.log("Fetching applications")
      const role = await AsyncStorage.getItem('role');
      const token = await AsyncStorage.getItem('token');
      console.log("Role: ", role);
      console.log("Token: ", token);
      return { role, token };
    } catch (error) {
      console.error(error);
      return { role: null, token: null };
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      const { role, token } = await retrieveStudentLogin();
      if (role && token) {
        try {
          const response = await axios.get(process.env.EXPO_PUBLIC_API_URL + `/${role}/outpass`, {
            headers: {
              "Content-Type": "application/json",
              "Authorization": `Bearer ${token}`,
            },
          });
          console.log(response.data.data[0]);
          setId(response.data.data[0]._id);
          setName(response.data.data[0].student.name);
          setRollno(response.data.data[0].student.rollNumber);
          setApplications(response.data.data);
        } catch (error) {
          console.error("Error fetching applications:", error);
        }
      }
    };

    fetchData();
  }, []);

  const handlePress = (app) => {
    console.log("hello")
    navigation.navigate("Outpass", {
      outTime: app.outTime,
      destination: app.destination,
      transport: app.transport,
      status:app.status,
      date: app.outDate,
      name: sname,
      rollno: rollno,
      purpose: app.purpose,
      issueTime: app.issueTime,
      issueDate: app.issueDate,
      issuedBy: "",
      id: id,
    });
  }

  const filteredApplications =
    value === "upcoming"
      ? applications.filter(
          (app) => app.status === "Pending" || app.status === "Accepted"
        )
      : applications.filter(
          (app) => app.status === "Rejected" || app.status === "Invalid"
        );

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
            <Pressable onPress={()=>{
              handlePress(app);
            }} key={index}>
              <Application
                destination={app.destination}
                time={app.outTime}
                status={app.status}
                date={app.outDate}
                name={sname}
                rollno={rollno}
                id={id}
              />
            </Pressable>
          ))}
        </View>
      </ScrollView>
      {/* <Navbar /> */}
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
