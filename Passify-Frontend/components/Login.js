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
import AdminHome from "./AdminHome";
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
      const response = await axios.post(
        `${process.env.EXPO_PUBLIC_API_URL}/auth/${role}/login`,
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

      if (response.status === 200) {
        ToastAndroid.show("Login Successful", ToastAndroid.SHORT);
        await AsyncStorage.setItem("role", role);
        await AsyncStorage.setItem("token", response.data.token);
        navigation.navigate("Main");
      } else {
        ToastAndroid.show("Invalid Credentials", ToastAndroid.SHORT);
      }
    } catch (error) {
      console.error("Error:", error);
      ToastAndroid.show("Login Failed", ToastAndroid.SHORT);
    } finally {
      setLoading(false);
    }
  };

  const fillTestCredentials = () => {
    switch (role) {
      case "student":
        setUsername("IIT2021133");
        setPassword("Munia@2003");
        break;
      case "admin":
        setUsername("gauri.warden");
        setPassword("123");
        break;
      case "guard":
        setUsername("sunil.guard");
        setPassword("123");
        break;
      default:
        setUsername("");
        setPassword("");
        break;
    }
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
              <Text style={styles.selectRoleText}>Select Role:</Text>
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
              <Pressable
                style={styles.fillButton}
                onPress={fillTestCredentials}
              >
                <Text style={styles.fillButtonText}>Fill Test Credentials</Text>
              </Pressable>
            </View>
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
  selectRoleText: {
    paddingBottom: 12,
    fontSize: 16,
    fontWeight: "bold",
    color: "#370556",
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
  fillButton: {
    backgroundColor: "#370556",
    height: 45,
    borderColor: "gray",
    borderWidth: 1,
    borderRadius: 5,
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
    marginBottom: 10,
  },
  fillButtonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
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
});
