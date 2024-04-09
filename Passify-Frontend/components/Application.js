import React, { useState } from "react";
import { StyleSheet, Text, View } from "react-native";

export default function Application({ name, rollno, destination, time, status, date }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isStudentLogin, setIsStudentLogin] = useState(false);

  return (
    <View style={styles.container}>
      <View style={styles.card}>
        <View style={styles.flex}>
          <View>
            <Text style={styles.destination}>{destination}</Text>
            <Text style={[styles.time,{marginTop:0}]}>{name}</Text>
            <Text style={[styles.time,{marginTop:2}]}>{rollno}</Text>
          </View>
          

          <View style={styles.statusTag}>
            <Text style={[styles.status, { color: getStatusColor(status) }]}>
              {status}
            </Text>
          </View>
        </View>
        <View style={[styles.flex,{marginTop:20,marginBottom:12}]}>
       
        <Text style={styles.date}>{date}</Text>
        <Text style={styles.time}>{time}</Text>
        </View>
      </View>
    </View>
  );
}

const getStatusColor = (status) => {
  switch (status) {
    case "Pending":
      return "orange";
    case "Accepted":
      return "green";
    case "Rejected":
      return "red";
    case "Invalid":
      return "blue";
    default:
      return "black";
  }
};

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    paddingTop: 1,
  },
  flex: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  card: {
    backgroundColor: "#370556",
    borderRadius: 10,
    paddingHorizontal: 20,
    paddingVertical: 20,
    marginTop: 12,
    width: 340,
    height: 150,
  },
  destination: {
    fontSize: 20,
    fontWeight: "bold",
    textAlign: "left",
    color: "white",
  },
  time: {
    fontSize: 14,
    textAlign: "left",
    color: "white",
  },
  date: {
    fontSize: 14,
    textAlign: "left",
    color: "white",
  },
  status: {
    fontSize: 12,
    fontWeight: "bold",
    textAlign: "left",
    paddingRight: 4,
    color: "black",
  },
  statusTag: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 10,
    width: 84,
    height: 34,
    backgroundColor: "white",
  },
});
