import React, { useEffect, useState } from "react";
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
  KeyboardAvoidingView,
  Platform,
  ToastAndroid,
  ScrollView,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import AdminHome from  './AdminHome';
import { Picker } from "@react-native-picker/picker";

import axios from "axios";

const logo = require("../assets/Login_Image.png");

export default function Login() {
  const [role, setRole] = useState("student");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isStudentLogin, setIsStudentLogin] = useState(false);
  const [isLoading, setLoading] = useState(false);
  const navigation = useNavigation();

  const handleLogin = async () => {
    try {
      setLoading(true);
      // const role = isStudentLogin ? "student" : "admin";
      // console.log(role);
      const response = await axios.post(
        process.env.EXPO_PUBLIC_API_URL + `/auth/${role}/login`,
        {
          username: username,
          password: password,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      console.log("Response:", response.data);

      if (response.status !== 200) {
        console.error("Error:", error);
        ToastAndroid.show(`Invalid Credentials`, ToastAndroid.SHORT);
        return;
      }
      ToastAndroid.show("Login Successful", ToastAndroid.SHORT);

      await AsyncStorage.setItem("role", role);
      await AsyncStorage.setItem("token", response.data.token);

      navigation.navigate("Main");
    } catch (error) {
      console.error("Error:", error);
      ToastAndroid.show("Login Failed", ToastAndroid.SHORT);
    } finally {
      setLoading(false);
    }
  };

  const toggleIsStudentLogin = () => {
    const newValue = !isStudentLogin;
    setIsStudentLogin(newValue);
    AsyncStorage.setItem("isStudentLogin", JSON.stringify(newValue));
  };

  return (
    <View style={styles.container}>
      <ScrollView>
        <KeyboardAvoidingView
          behavior={Platform.OS === "ios" ? "padding" : null}
        >
          <SafeAreaView style={styles.inner}>
            {isLoading && <Text> Loading ... </Text>}
            <Image source={logo} style={styles.image} resizeMode="contain" />
            <Text style={styles.title}>Login</Text>
            <View style={styles.inputView}>
              <TextInput
                style={styles.input}
                placeholder="Username"
                value={username}
                onChangeText={setUsername}
                autoCorrect={false}
                autoCapitalize="none"
              />
              <TextInput
                style={styles.input}
                placeholder="Password"
                secureTextEntry
                value={password}
                onChangeText={setPassword}
                autoCorrect={false}
                autoCapitalize="none"
              />
              <Text
              style={{
                flexDirection: "row",
                alignItems: "flex-start",
                textAlign: "left",
                paddingBottom: 12,
              }}
            >
              Select Role:
            </Text>

            <View style={styles.pickerContainer}>
              <Picker
                selectedValue={role}
                onValueChange={(itemValue) => setRole(itemValue)}
                style={styles.picker}
              >
                <Picker.Item label="Student" value="student" />
                <Picker.Item label="Admin" value="admin" />
                <Picker.Item label="Guard" value="guard" />
              </Picker>
            </View>
            </View>

            {/* {!isStudentLogin && (
              <View style={styles.toggleButtonView}>
                <Text style={styles.toggleText}>Admin</Text>
                <Switch
                  trackColor={{ false: "blue", true: "purple" }}
                  thumbColor={"white"}
                  onValueChange={() => setIsStudentLogin(!isStudentLogin)}
                  value={isStudentLogin}
                />
              </View>
            )} */}

            {/* {isStudentLogin && (
              <View style={styles.toggleButtonView}>
                <Text style={styles.toggleText}>Student</Text>
                <Switch
                  trackColor={{ false: "blue", true: "purple" }}
                  thumbColor={"white"}
                  onValueChange={() => setIsStudentLogin(!isStudentLogin)}
                  value={isStudentLogin}
                />
              </View>
            )} */}
            <View style={styles.buttonView}>
              <Pressable style={styles.button} onPress={handleLogin}>
                <Text style={styles.buttonText}>LOGIN</Text>
              </Pressable>
            </View>
          </SafeAreaView>
        </KeyboardAvoidingView>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },
  inner: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 40,
    paddingTop: 40,
  },
  image: {
    height: 290,
    width: 290,
  },
  title: {
    fontSize: 30,
    fontWeight: "bold",
    textAlign: "left",
    paddingVertical: 40,
    color: "#370556",
  },
  inputView: {
    width: "100%",
    marginBottom: 5,
  },
  input: {
    height: 50,
    paddingHorizontal: 20,
    borderColor: "#370556",
    borderWidth: 1,
    borderRadius: 7,
    marginBottom: 12,
    width: "100%",
  },
  button: {
    backgroundColor: "#370556",
    height: 45,
    borderColor: "gray",
    borderWidth: 1,
    borderRadius: 5,
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
  },
  buttonText: {
    color: "white",
    fontSize: 18,
    fontWeight: "bold",
  },
  buttonView: {
    width: "100%",
    marginBottom: 0,
  },
  toggleButtonView: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    width: "100%",
    marginTop: 0,
    marginBottom: 6,
  },
  toggleText: {
    fontSize: 16,
    textAlign: "left",
    fontWeight: "bold",
    color: "purple",
  },
  pickerContainer: {
    width: "100%",
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    marginBottom: 10,
  },
  picker: {
    width: "100%", 
  },
});
