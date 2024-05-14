import React, { useState, useEffect } from "react";
import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View, ScrollView } from "react-native";
import { Button, Chip } from "react-native-paper";
import Header from "./Header";
import Icon from "react-native-vector-icons/FontAwesome";
import Navbar from "./Navbar";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/native";
import axios from "axios";
import Qr from "./Qr";

export default function Outpass({ route }) {
  const Navigation = useNavigation();
  const {
    destination,
    outDate,
    transport,
    outTime,
    name,
    rollno,
    purpose,
    status,
    _id,
    issuedBy,
    issueDateTime,
  } = route.params;

  const [role, setRole] = useState("student");

  const formatDate = (dateStr) => {
    // Parse the date string into a Date object
    const parsedDate = new Date(dateStr);

    // Check if parsedDate is a valid Date object
    if (isNaN(parsedDate)) {
      return "Invalid Date"; // Handle invalid date string
    }

    // Format the parsedDate using your existing formatDate logic
    const formattedDay = String(parsedDate.getDate()).padStart(2, "0");
    const formattedMonth = String(parsedDate.getMonth() + 1).padStart(2, "0");
    const formattedYear = parsedDate.getFullYear();

    // Create the formatted date string in "dd-mm-yyyy" format
    return `${formattedDay}-${formattedMonth}-${formattedYear}`;
  };

  const formatTime = (timeStr) => {
    // Assuming timeStr is in a format that can be directly formatted by toLocaleTimeString
    return new Date(timeStr).toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    });
  };


  // const retrieveStudentLogin = async () => {
  //   try {
  //     console.log("Fetching applications")
  //     role = await AsyncStorage.getItem('role');
  //     const token = await AsyncStorage.getItem('token');
  //     console.log("Role: ", role);
  //     console.log("Token: ", token);
  //     return { role, token };
  //   } catch (error) {
  //     console.error(error);
  //     return { role: null, token: null };
  //   }
  // };       

  const handleAccept = async () => {
    try {
      const token = await AsyncStorage.getItem("token");
      console.log(_id);

      const response = await axios.patch(
        process.env.EXPO_PUBLIC_API_URL + `/admin/outpass/${_id}`,
        { status: "Accepted" },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (response.data.data.status === "Accepted")
        Navigation.navigate("ApplicationsPage");
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const handleReject = async () => {
    try {
      const token = await AsyncStorage.getItem("token");
      const response = await axios.patch(
        process.env.EXPO_PUBLIC_API_URL + `/admin/outpass/${_id}`,
        { status: "Rejected" },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (response.data.data.status === "Rejected")
        Navigation.navigate("ApplicationsPage");
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const handleExit = async () => {
    try {
      const token = await AsyncStorage.getItem("token");
      // console.log("hiii",token);
      const response = await axios.patch(
        process.env.EXPO_PUBLIC_API_URL + `/guard/outpass/${_id}`,
        { status: "Used" },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log("hi", response.data.data.status)
      if (response.data.data.status === "Used")
        Navigation.navigate("ApplicationsPage");
    } catch (error) {
      console.error("Error:", error);
    }
  }

  // console.log(role);

  return (
    <ScrollView style={styles.container}>
      <View style={styles.card}>
        <View style={styles.cardTop}>
          <Text style={styles.title}>{destination}</Text>
          <Chip
            style={[styles.chip, { backgroundColor: getStatusColor(status) }]}
            textStyle={styles.chipText}
          >
            {status}
          </Chip>
        </View>
        <View style={styles.detailsContainer}>
          <DetailRow label="Name" icon="user" text={name} />
          <DetailRow label="Roll Number" icon="user" text={rollno} />
          <DetailRow
            label="Out Date"
            icon="calendar"
            text={formatDate(outDate)}
          />
          <DetailRow
            label="Out Time"
            icon="clock-o"
            text={formatTime(outTime)}
          />
          <DetailRow label="Transport" icon="bus" text={transport} />
          <DetailRow label="Purpose of Visit" icon="user" text={purpose} />
        </View>
        {issuedBy && issueDateTime && (
          <View style={[styles.issuedBy, { marginTop: 20 }]}>
            <Text style={{ color: "white", padding: 4 }}>
              Issued By: {issuedBy}
            </Text>

            <Text style={{ color: "white", padding: 4 }}>
              Issue Date: {formatDate(issueDateTime)}
            </Text>
            <Text style={{ color: "white", padding: 4 }}>
              Issue Time: {formatTime(issueDateTime)}
            </Text>
          </View>
        )}
        {role == "admin" && (
          <View
            style={{
              flexDirection: "row",
              justifyContent: "center",
              alignItems: "center",
              marginTop: 32,
            }}
          >
            {status === "Pending" && (
              <Button
                style={{ borderColor: "green", marginRight: 48 }}
                textColor="green"
                mode="outlined"
                icon="check"
                onPress={handleAccept}
              >
                Accept
              </Button>
            )}
            {status === "Pending" && (
              <Button
                style={{ borderColor: "red" }}
                textColor="red"
                mode="outlined"
                icon="close"
                onPress={handleReject}
              >
                Reject
              </Button>
            )}

            

          </View>
        )}

        <StatusBar style="auto" />
      </View>
      {status === "Accepted" && role == "student" && (
        <View style={styles.qrContainer}>
          <Qr value={_id} />
        </View>
      )}

      {status==="Accepted"  &&
            <Button
            style={{ borderColor: "red" }}
            textColor="red"
            mode="outlined"
            icon="close"
            onPress={handleExit}
          >
           Confirm Exit
          </Button>
            }
    </ScrollView>
  );
}

const DetailRow = ({ label, icon, text }) => (
  <View style={styles.detailRow}>
    <Icon name={icon} style={styles.detailIcon} />
    <View>
      <Text style={styles.detailLabel}>{label}</Text>
      <Text style={styles.detailText}>{text}</Text>
    </View>
  </View>
);

const getStatusColor = (status) => {
  switch (status) {
    case "Pending":
      return "orange";
    case "Accepted":
      return "green";
    case "Rejected":
      return "red";
    case "Used":
      return "blue";
    default:
      return "black";
  }
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  card: {
    margin: 20,
    padding: 20,
    borderRadius: 10,
    backgroundColor: "#370556",
    color: "white",
    position: "relative",
  },
  cardTop: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "white",
  },

  chipText: {
    color: "#fff",
  },
  detailsContainer: {
    padding: 12,
    marginBottom: 0,
  },
  detailRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
  },
  detailIcon: {
    marginRight: 10,
    fontSize: 20,
    color: "white",
  },
  detailLabel: {
    color: "#aaa",
    marginBottom: 5,
  },
  detailText: {
    fontSize: 16,
    color: "white",
  },
  qrContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 20,
    padding: 20,
  },
});
