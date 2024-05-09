import React from "react";
import { StyleSheet, Text, View } from "react-native";

export default function Application({
  name,
  rollno,
  destination,
  time,
  status,
  date, // Assume date is coming as a string from API (e.g., "2024-05-09T12:30:00")
  role,
}) {
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

  return (
    <View style={styles.container}>
      <View style={styles.card}>
        <View style={styles.flex}>
          <View>
            <Text style={styles.destination}>{destination}</Text>
            {role !== "student" && (
              <View>
                <Text style={[styles.time, { marginTop: 0 }]}>{name}</Text>
                <Text style={[styles.time, { marginTop: 2 }]}>{rollno}</Text>
              </View>
            )}
          </View>

          <View style={styles.statusTag}>
            <Text style={[styles.status, { color: getStatusColor(status) }]}>
              {status}
            </Text>
          </View>
        </View>
        <View style={[styles.flex, { marginTop: 20, marginBottom: 12 }]}>
          <Text style={styles.date}>{formatDate(date)}</Text>
          <Text style={styles.time}>{formatTime(time)}</Text>
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
    case "Used":
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
