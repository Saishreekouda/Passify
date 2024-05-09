import React, { useEffect, useState } from "react";
import { View, Text, Image, StyleSheet, ScrollView } from "react-native";
import { Button, TextInput } from "react-native-paper";
import {
  DatePickerModal,
  registerTranslation,
  enGB,
} from "react-native-paper-dates";
import { TimePickerModal } from "react-native-paper-dates";
import { SafeAreaProvider } from "react-native-safe-area-context";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import home from "../assets/home.png";
import { useNavigation } from "@react-navigation/native";

let token = "none";

const Home = () => {
  const navigation = useNavigation();
  registerTranslation("en-gb", enGB);

  const [formData, setFormData] = useState({
    destination: "",
    outDate: null,
    outTime: null, // Store selected time as Date object
    transport: "",
    purpose: "",
  });

  const [datePickerVisible, setDatePickerVisible] = useState(false);
  const [timePickerVisible, setTimePickerVisible] = useState(false);

  const retrieveStudentLogin = async () => {
    try {
      const role = await AsyncStorage.getItem("role");
      token = await AsyncStorage.getItem("token");
      if (!token) {
        console.error("Token not found");
        return;
      }
      console.log("Role: ", role);
      console.log("Token: ", token);
    } catch (error) {
      console.error("Error retrieving token:", error);
    }
  };

  const formatDate = (date) => {
    const day = date.getDate();
    const month = date.getMonth() + 1; // Month is zero-based
    const year = date.getFullYear();

    // Ensure two-digit format for day and month (e.g., 01, 02, ..., 09)
    const formattedDay = day < 10 ? `0${day}` : `${day}`;
    const formattedMonth = month < 10 ? `0${month}` : `${month}`;

    // Create the formatted date string in "dd-mm-yyyy" format
    return `${formattedDay}-${formattedMonth}-${year}`;
  };

  const fillTestCredentials = () => {
    const getRandomString = (length) => {
      const characters =
        "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
      let result = "";
      for (let i = 0; i < length; i++) {
        result += characters.charAt(
          Math.floor(Math.random() * characters.length)
        );
      }
      return result;
    };

    setFormData({
      destination: getRandomString(10), // Generate a random string of length 10
      outDate: new Date(),
      outTime: new Date(),
      transport: "Cab Test",
      purpose: "Shopping Test",
    });
  };

  useEffect(() => {
    const fetchData = async () => {
      await retrieveStudentLogin();
    };

    fetchData();
  }, []);

  const handleDateConfirm = (params) => {
    setDatePickerVisible(false);
    const selectedDate = params.date;

    setFormData({ ...formData, outDate: selectedDate });
  };

  const handleTimeConfirm = ({ hours, minutes }) => {
    setTimePickerVisible(false);

    // Create a new Date object with selected time components
    const selectedTime = new Date();
    selectedTime.setHours(hours);
    selectedTime.setMinutes(minutes);

    setFormData({ ...formData, outTime: selectedTime });
  };

  const handleSubmit = async () => {
    try {
      console.log(formData);
      const response = await axios.post(
        `${process.env.EXPO_PUBLIC_API_URL}/student/outpass`,
        {
          ...formData,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log(response.data);

      setFormData({
        destination: "",
        outDate: null,
        outTime: null,
        transport: "",
        purpose: "",
      });
      navigation.navigate("Applications");
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollViewContent}>
        <Text style={styles.title}>Create New Outpass</Text>

        <Image source={home} style={styles.image} />

        <View style={styles.inputView}>
          <TextInput
            style={styles.input}
            placeholder="Destination"
            value={formData.destination}
            onChangeText={(text) =>
              setFormData({ ...formData, destination: text })
            }
            left={<TextInput.Icon icon="map-marker" />}
          />
          <TextInput
            style={styles.input}
            placeholder="Out Date"
            value={formData.outDate ? formatDate(formData.outDate) : ""}
            onTouchStart={() => setDatePickerVisible(true)}
            left={<TextInput.Icon icon="calendar" />}
          />
          <TextInput
            style={styles.input}
            placeholder="Out Time"
            value={
              formData.outTime
                ? formData.outTime.toLocaleTimeString([], {
                    hour: "2-digit",
                    minute: "2-digit",
                  })
                : ""
            }
            onTouchStart={() => setTimePickerVisible(true)}
            left={<TextInput.Icon icon="clock" />}
          />
          <TextInput
            style={styles.input}
            placeholder="Transport"
            value={formData.transport}
            onChangeText={(text) =>
              setFormData({ ...formData, transport: text })
            }
            left={<TextInput.Icon icon="car" />}
          />
          <TextInput
            style={styles.input}
            placeholder="Purpose"
            value={formData.purpose}
            onChangeText={(text) => setFormData({ ...formData, purpose: text })}
            left={<TextInput.Icon icon="account" />}
          />

          <Button mode="contained" onPress={handleSubmit} style={styles.button}>
            Submit
          </Button>
          <Button mode="text" onPress={fillTestCredentials}>
            {" "}
            Fill Test Credentials{" "}
          </Button>
        </View>

        {/* Date Picker Modal */}
        <DatePickerModal
          visible={datePickerVisible}
          mode="single"
          locale="en-gb"
          onDismiss={() => setDatePickerVisible(false)}
          date={formData.outDate || new Date()} // Pass Date object to date picker
          onConfirm={handleDateConfirm}
          validRange={{ startDate: new Date() }}
          presentationStyle="overFullScreen"
        />

        {/* Time Picker Modal */}
        <TimePickerModal
          locale="en-gb"
          visible={timePickerVisible}
          onDismiss={() => setTimePickerVisible(false)}
          onConfirm={handleTimeConfirm}
          hours={formData.outTime ? formData.outTime.getHours() : 12}
          minutes={formData.outTime ? formData.outTime.getMinutes() : 0}
          minHour={new Date().getHours()} // Set minHour to current hour
          minMinute={new Date().getMinutes()} // Set minMinute to current minute
        />
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 20,
  },
  image: {
    width: 200,
    height: 200,
  },
  inputView: {
    width: 250,
  },
  input: {
    marginBottom: 10,
  },
  button: {
    marginTop: 20,
  },
});

export default Home;
