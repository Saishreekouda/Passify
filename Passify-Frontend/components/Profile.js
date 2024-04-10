import React from "react";
import { View, Text, Image, StyleSheet, Pressable } from "react-native";
import Navbar from "./Navbar";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { useState, useEffect } from "react";
import { useNavigation } from "@react-navigation/native";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Icon from "react-native-vector-icons/FontAwesome";

const ProfileScreen = () => {
  const [name, setName] = useState("");
  const [username, setUserName] = useState("");
  const navigation = useNavigation();
  const [rollno, setRollno] = useState("");
  const [semester, setSemester] = useState("");
  const [program, setProgram] = useState("");
  const [phone, setPhone] = useState("");
  const [role, setRole] = useState("null"); 

  let token=""
  const retrieveStudentLogin = async () => {
    try {
      const role = await AsyncStorage.getItem("role");
      token = await AsyncStorage.getItem('token');
      setRole(role)
      console.log("Role: ", role);
      console.log("Token: ", token);
    } catch (error) {
      console.error(error);
    }
  };

  const logout = async () => {
    try {
      await AsyncStorage.removeItem('token');
      token="";
      navigation.navigate('Login'); 
      // Navigate to the login screen after logout
      console.log("hiiii",token);
    } catch (error) {
      console.error('Error logging out:', error);
    }
  };

  useEffect(() => {
     
    const fetchData = async () => {
      await retrieveStudentLogin();
      try {
        const role = await AsyncStorage.getItem("role");
        const token = await AsyncStorage.getItem('token');
  
        const response = await axios.get(
          `${process.env.EXPO_PUBLIC_API_URL}/${role}/profile`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        console.log(response.data.data)
        if(role==="admin" || role==="guard"){
          const { name, username } = response.data.data[0];
          setName(name);
          setUserName(username);
        } else {
          const { name, rollNumber, semester, phone, program } = response.data.data;
          setName(name);
          setRollno(rollNumber);
          setProgram(program);
          setSemester(semester);
          setPhone(phone);
        }
      } catch (error) {
        console.error("Error fetching profile data:", error);
      }
    };
  
    fetchData();
  }, []);

  return (
    <SafeAreaProvider>
      <View style={styles.container}>
        <View style={[styles.avatarContainer, { marginBottom: 12 }]}>
          <Image
            source={{ uri: 'https://avatars.githubusercontent.com/u/55929607?v=4' }}
            style={[styles.avatar]}
          />
          <View style={{ flexDirection: "row", justifyContent: 'center', alignItems: 'center', gap: 12 }}>
            <Text style={[styles.name]}>{name}</Text>
            <Pressable onPress={logout}>
            <Icon name="sign-out" size={24} style={{ marginBottom: -8 }} />

            </Pressable>
          </View>
        </View>
  
        
        
        {role === 'student' && (
          <>
          <View style={styles.infoContainer}>
          <Text style={styles.infoLabel}>Roll Number:</Text>
          <Text style={styles.infoValue}>{rollno}</Text>
        </View>
        <View style={styles.infoContainer}>
          <Text style={styles.infoLabel}>Semester:</Text>
          <Text style={styles.infoValue}>{semester}</Text>
        </View>

            <View style={styles.infoContainer}>
              <Text style={styles.infoLabel}>Program:</Text>
              <Text style={styles.infoValue}>{program}</Text>
            </View>
            <View style={styles.infoContainer}>
              <Text style={styles.infoLabel}>Phone:</Text>
              <Text style={styles.infoValue}>{phone}</Text>
            </View>
          </>
        )}
  
        {(role === 'admin' || role==="guard") && (
          <>
            <View style={styles.infoContainer}>
              <Text style={styles.infoLabel}>Username:</Text>
              <Text style={styles.infoValue}>{username}</Text>
            </View>

            <View style={styles.infoContainer}>
              <Text style={styles.infoLabel}>Name:</Text>
              <Text style={styles.infoValue}>{name}</Text>
            </View>
          </>
        )}
        
        <View style={styles.navbar}>
          {/* <Navbar /> */}
        </View>
      </View>
    </SafeAreaProvider>
  );
  
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    padding: 20,
    paddingBottom: 0,
  },
  avatarContainer: {
    alignItems: "center",
    marginTop: 20,
  },
  avatar: {
    width: 150,
    height: 150,
    borderRadius: 75,
  },
  name: {
    fontSize: 20,
    fontWeight: "bold",
    marginTop: 10,
  },
  infoContainer: {
    marginTop: 20,
  },
  infoLabel: {
    fontWeight: "bold",
  },
  infoValue: {
    marginTop: 5,
  },
  navbar: {
    flex: 1,
    marginLeft: -20,
    marginRight: -20,
  },
});

export default ProfileScreen;