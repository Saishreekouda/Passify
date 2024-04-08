import React, { useState } from "react";
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
} from "react-native";

const logo = require("../assets/Login_Image.png");

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isStudentLogin, setIsStudentLogin] = useState(false); 

  return (
    <SafeAreaView style={styles.container}>
      <Image source={logo} style={styles.image} resizeMode="contain" />
      <Text style={styles.title}>Login</Text>
      <View style={styles.inputView}>
        <TextInput
          style={styles.input}
          placeholder="USERNAME"
          value={username}
          onChangeText={setUsername}
          autoCorrect={false}
          autoCapitalize="none"
        />
        <TextInput
          style={styles.input}
          placeholder="PASSWORD"
          secureTextEntry
          value={password}
          onChangeText={setPassword}
          autoCorrect={false}
          autoCapitalize="none"
        />
      </View>

      <View style={styles.buttonView}>
        <Pressable
          style={styles.button}
        >
          <Text style={styles.buttonText}>LOGIN</Text>
        </Pressable>
      </View>

      {!isStudentLogin && (
        <View style={styles.toggleButtonView}>
          <Text style={styles.toggleText}>Admin</Text>
          <Switch
            trackColor={{ false: "lightgrey", true: "purple" }}
            thumbColor={"white"}
            onValueChange={() => setIsStudentLogin(!isStudentLogin)}
            value={isStudentLogin}
          />
        </View>
      )}

      {isStudentLogin && (
        <View style={styles.toggleButtonView}>
          <Text style={styles.toggleText}>Student</Text>
          <Switch
            trackColor={{ false: "lightgrey", true: "purple" }}
            thumbColor={"white"}
            onValueChange={() => setIsStudentLogin(!isStudentLogin)}
            value={isStudentLogin}
          />
        </View>
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    paddingTop: 90,
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
    paddingHorizontal: 40,
    marginBottom: 5,
  },
  input: {
    height: 50,
    paddingHorizontal: 20,
    borderColor: "#370556",
    borderWidth: 1,
    borderRadius: 7,
    marginBottom: 15,
  },
  button: {
    backgroundColor: "#370556",
    height: 45,
    borderColor: "gray",
    borderWidth: 1,
    borderRadius: 5,
    alignItems: "center",
    justifyContent: "center",
  },
  buttonText: {
    color: "white",
    fontSize: 18,
    fontWeight: "bold",
  },
  buttonView: {
    width: "100%",
    paddingHorizontal: 40,
    marginBottom: 10,
  },
  toggleButtonView: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    width: "100%",
    marginTop: 10,
  },
  toggleText: {
    fontSize: 16,
    textAlign:"left",
    fontWeight: "bold",
    color: "purple",
  },
});
