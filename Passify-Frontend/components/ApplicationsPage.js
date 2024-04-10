import React, { useState, useEffect } from "react";
import {
  View,
  StyleSheet,
  Text,
  Pressable,
  ScrollView,
  RefreshControl,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Application from "./Application";
import Navbar from "./Navbar";
import axios from "axios";
import { SegmentedButtons } from "react-native-paper";
import { useNavigation } from "@react-navigation/native";
const logo = require("../assets/Login_Image.png");

export default function ApplicationsPage({ navigation }) {
  const [applications, setApplications] = useState([]);
  const [value, setValue] = useState("upcoming");
  const [id, setId] = useState(0);
  const [sname, setName] = useState("");
  const [rollno, setRollno] = useState("");
  const [role, setRole] = useState("");
  const [refreshing, setRefreshing] = useState(false); // State for refreshing

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    setRefreshing(true); // Start refreshing
    const { role: retrievedRole, token } = await retrieveStudentLogin();
    if (retrievedRole && token) {
      try {
        setRole(retrievedRole);
        const response = await axios.get(
          process.env.EXPO_PUBLIC_API_URL + `/${retrievedRole}/outpass`,
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          }
        );
        // console.log(response.data.data[0]);
        setId(response.data.data[0]._id);
        setName(response.data.data[0].student.name);
        setRollno(response.data.data[0].student.rollNumber);
        console.log(response.data.data);
        setApplications(response.data.data);
      } catch (error) {
        console.error("Error fetching applications:", error);
      } finally {
        setRefreshing(false); // Finish refreshing
      }
    }
  };

  const retrieveStudentLogin = async () => {
    try {
      console.log("Fetching applications");
      const role = await AsyncStorage.getItem("role");
      const token = await AsyncStorage.getItem("token");
      console.log("Role: ", role);
      console.log("Token: ", token);
      return { role, token };
    } catch (error) {
      console.error(error);
      return { role: null, token: null };
    }
  };

  const handlePress = (app) => {
    console.log("hello");
    navigation.navigate("Outpass", {
      outTime: app.outTime,
      destination: app.destination,
      transport: app.transport,
      status: app.status,
      date: app.outDate,
      name: sname,
      rollno: rollno,
      purpose: app.purpose,
      issueTime: app.issueTime,
      issueDate: app.issueDate,
      issuedBy: app.issuedBy,
      id: id,
    });
  };

  const filteredApplications =
    value === "upcoming"
      ? role === "admin"
        ? applications.filter((app) => app.status === "Pending")
        : applications.filter(
            (app) => app.status === "Pending" || app.status === "Accepted"
          )
      : role === "admin"
      ? applications.filter(
          (app) => app.status === "Rejected" || app.status === "Accepted"
        )
      : applications.filter(
          (app) => app.status === "Rejected" || app.status === "Used"
        );

  return (
    <View style={styles.container}>
      <ScrollView
        style={{ paddingBottom: 20 }}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={fetchData} />
        }
      >
        <View>
        <Text style={styles.title}>{role==="guard"?"Used Applications":"My Applications"}</Text>
         
         
 { role!=="guard" &&  <View style={{ width: "100%", paddingLeft: 32, paddingRight: 32, paddingTop: 0 }}>
            <SegmentedButtons
              value={value}
              onValueChange={setValue}
              buttons={[
                { value: "upcoming", label: "Upcoming" },
                { value: "past", label: "Past" },
              ]}
            />
          </View>}

          {role!=="guard" && filteredApplications.map((app, index) => (
            <Pressable onPress={() => {
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
          {
            role==="guard" && applications.filter((app,index)=>app.status==="Used").map((app,index)=>(
              <Pressable onPress={() => {
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
            ))
          }
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
    marginLeft: 32,
    color: "#370556",
  },
  navbar: {
    marginTop: 210,
    width: 400,
  },
});
