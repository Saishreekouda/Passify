import React from 'react';
import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import { Button, Chip } from 'react-native-paper';
import Header from "./Header";
import Icon from "react-native-vector-icons/FontAwesome";

export default function Outpass({route, navigation}) {
    const { destination, date, transport, time, name, rollno, purpose, status, issuedBy, issueDate, issueTime } = route.params;
    console.log(route.params);
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
  return (
    <View style={styles.container}>
      {/* <Header title="View Outpass Details" /> */}
      <View style={styles.card}>
        <View style={styles.cardTop}>
          <Text style={styles.title}>{destination}</Text>
          <Chip style={[styles.chip, {backgroundColor: getStatusColor(status)}]} textStyle={styles.chipText}>{status}</Chip>
        </View>
        <View style={styles.detailsContainer}>
          <DetailRow label="Date" icon="calendar" text={date} />
          {/* <DetailRow label="Destination" icon="map-marker" text={destination} /> */}
          <DetailRow label="Transport" icon="bus" text={transport} />
          <DetailRow label="Out Time" icon="clock-o" text={time} />
          <DetailRow label="Purpose of Visit" icon="user" text={purpose} />
        </View>
        <View style={[styles.issuedBy, {marginTop:20}]}>
            <Text style={{color:"white", padding:4}}>Issued By: {issuedBy}</Text>
            <Text style={{color:"white", padding:4}}>Issue Date: {issueDate}</Text>
            <Text style={{color:"white", padding:4}}>Issue Time: {issueTime}</Text>
        </View>
        <View style={{flexDirection:"row", justifyContent:'center', alignItems:'center', marginTop:32}}> 
        <Button style={{borderColor: 'green', marginRight:48}} textColor='green' mode="outlined" icon="check"> Accept </Button>
        <Button style={{borderColor: 'red'}} textColor='red' mode="outlined" icon="close"> Reject </Button>
      </View>
      <StatusBar style="auto" />
      </View>
     
    </View>
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
    position: "relative", // To position issuedBy text
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
    padding:12,
    marginBottom: 80,
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
  issuedBy: {
    position: "absolute",
    bottom: 80,
    right: 12,
  },
});
