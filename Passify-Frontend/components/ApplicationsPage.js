import React, { useState, useEffect, useCallback } from "react";
import {
  View,
  StyleSheet,
  Text,
  Pressable,
  ScrollView,
  RefreshControl,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import Application from "./Application";
import { SegmentedButtons } from "react-native-paper";
import { useNavigation, useFocusEffect } from "@react-navigation/native";

export default function ApplicationsPage() {
  const navigation = useNavigation();

  const [applications, setApplications] = useState([]);
  const [role, setRole] = useState("");
  const [refreshing, setRefreshing] = useState(false);
  const [selectedTab, setSelectedTab] = useState("upcoming");

  const fetchData = useCallback(async () => {
    setRefreshing(true);
    const { role: retrievedRole, token } = await retrieveStudentLogin();
    if (retrievedRole && token) {
      try {
        setRole(retrievedRole);
        const response = await axios.get(
          `${process.env.EXPO_PUBLIC_API_URL}/${retrievedRole}/outpass`,
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setApplications(response.data.data);
      } catch (error) {
        console.error("Error fetching applications:", error);
      } finally {
        setRefreshing(false);
      }
    }
  }, []);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  useFocusEffect(
    useCallback(() => {
      fetchData();
    }, [fetchData])
  );

  const retrieveStudentLogin = async () => {
    try {
      const role = await AsyncStorage.getItem("role");
      const token = await AsyncStorage.getItem("token");
      return { role, token };
    } catch (error) {
      console.error(error);
      return { role: null, token: null };
    }
  };

  const handlePress = (app) => {
    navigation.navigate("Outpass", {
      ...app,
      name: app.student.name,
      rollno: app.student.rollNumber,
    });
  };

  const renderApplications = (apps) => {
    return apps.map((app, index) => (
      <Pressable key={index} onPress={() => handlePress(app)}>
        <Application
          destination={app.destination}
          time={app.applicationDateTime}
          status={app.status}
          date={app.outDate}
          name={app.student.name}
          rollno={app.student.rollNumber}
          id={app._id}
          role={role}
        />
      </Pressable>
    ));
  };

  const filteredApplications = () => {
    if (role === "admin") {
      if (selectedTab === "upcoming") {
        return applications.filter((app) => app.status === "Pending");
      } else if (selectedTab === "past") {
        return applications.filter((app) => app.status !== "Pending");
      }
    } else if (role === "student") {
      return applications.filter((app) => {
        if (selectedTab === "upcoming") {
          return app.status === "Pending" || app.status === "Accepted";
        } else if (selectedTab === "past") {
          return app.status === "Rejected" || app.status === "Used";
        }
      });
    } else {
      return applications;
    }
    return [];
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>
        {role === "guard" ? "Used Applications" : "My Applications"}
      </Text>

      {role !== "guard" && (
        <View style={styles.segmentedButtons}>
          <SegmentedButtons
            value={selectedTab}
            onValueChange={setSelectedTab}
            buttons={[
              { value: "upcoming", label: "Upcoming" },
              { value: "past", label: "Past" },
            ]}
          />
        </View>
      )}

      {selectedTab === "upcoming" || selectedTab === "past" ? (
        <ScrollView
          style={styles.scrollableView}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={fetchData} />
          }
        >
          {renderApplications(filteredApplications())}
        </ScrollView>
      ) : (
        <View style={styles.fixedView}>
          {renderApplications(filteredApplications())}
        </View>
      )}

      {/* {refreshing && <Text>Loading...</Text>} */}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
    padding: 16,
  },
  title: {
    fontSize: 30,
    fontWeight: "bold",
    color: "#370556",
    marginBottom: 20,
  },
  segmentedButtons: {
    width: "100%",
    marginBottom: 20,
  },
  scrollableView: {
    flex: 1,
    width: "100%",
  },
  fixedView: {
    width: "100%",
    maxHeight: 300, // Set max height or use other styling as needed
  },
});
