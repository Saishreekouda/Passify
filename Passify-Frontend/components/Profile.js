import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';
import Navbar from './Navbar';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import {useState,useEffect} from 'react';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
const ProfileScreen = () => {
  const [name,setName]=useState("");
  const [rollno,setRollno]=useState("");
  const [semester,setSemester]=useState("");
  const [program,setProgram]=useState("");
  const [phone,setPhone]=useState("");
  const token="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6IklJVDIwMjExMzMiLCJyb2xlIjoic3R1ZGVudCIsImlhdCI6MTcxMjY1MzQ5MywiZXhwIjoxNzEyNzM5ODkzfQ.-hYsst26hH9bsLgNR2kVDd7tjSbUSqTcIOHenEezhNc";
  const retrieveStudentLogin = async () => {
    try {
      const role = await AsyncStorage.getItem('role');
      // const token = await AsyncStorage.getItem('token');
     
      console.log("Role: ", role);
      console.log("Token: ", token);
    } catch (error) {
      console.error(error);
    }
  };
  // retrieveStudentLogin();
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `${process.env.EXPO_PUBLIC_API_URL}/student/profile`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        const {name, rollNumber,semester, phone, program} = response.data.data; 
      
        setName(name);
        setRollno(rollNumber);
        setProgram(program);
        setSemester(semester);
        setPhone(phone);
      
      } catch (error) {
        console.error('Error fetching profile data:', error);
      }
    };
  
    fetchData(); 
  
  },[]); 
  
  return (
    <SafeAreaProvider>

    <View style={styles.container}>
      <View style={styles.avatarContainer}>
        <Text style={styles.name}>{name}</Text>
      </View>
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
      
      <View style={styles.navbar}>
      <Navbar navigation={navigation}/>
      </View>
      
     
      
    </View>
    </SafeAreaProvider>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 20,
    paddingBottom:0
  },
  avatarContainer: {
    alignItems: 'center',
    marginTop: 20,
  },
  avatar: {
    width: 150,
    height: 150,
    borderRadius: 75,
  },
  name: {
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: 10,
  },
  infoContainer: {
    marginTop: 20,
  },
  infoLabel: {
    fontWeight: 'bold',
  },
  infoValue: {
    marginTop: 5,
  },
    navbar: {
        flex:1,
        marginLeft:-20,
        marginRight:-20
    },
 
});

export default ProfileScreen;
