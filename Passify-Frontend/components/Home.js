import React, { useEffect, useState } from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';
import { Button, TextInput } from 'react-native-paper';
import axios from 'axios';
import Navbar from './Navbar';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import AsyncStorage from '@react-native-async-storage/async-storage';
import home from "../assets/home.png"
import { useNavigation } from '@react-navigation/native';

let token="none";

const Home = () => {
  const navigation = useNavigation();

  const [formData, setFormData] = useState({
    destination: '',
    outDate: '',
    outTime: '',
    transport: '',
    purpose: '',
  });
  const [name, setName] = useState("");
  const [rollno, setRollno] = useState("");

      
  const retrieveStudentLogin = async () => {
    try {
      const role = await AsyncStorage.getItem('role');
      token = await AsyncStorage.getItem('token');
      if (!token) {
        console.error('Token not found');
        return;
      }
      console.log("Role: ", role);
      console.log("Token: ", token);
    } catch (error) {
      console.error('Error retrieving token:', error);
    }
  };
  
  
  useEffect(() => {
    const fetchData = async () => {
      await retrieveStudentLogin(); 
      // fetchStudentInfo();
    };
  
    fetchData();
  }, []);
  

 
  console.log(name);
  const handleInputChange = (field, value) => {
    setFormData({ ...formData, [field]: value });
  };

  const handleSubmit = async () => {
    try {
      const response = await axios.post(
        `${process.env.EXPO_PUBLIC_API_URL}/student/outpass`,
        {
          destination: formData.destination,
          outDate: formData.outDate,
          outTime: formData.outTime,
          transport: formData.transport,
          purpose: formData.purpose,
          // status: "Pending",
          // name: name,
          // rollNumber: rollno,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log(response.data);
  
      setFormData({
        destination: '',
        outDate: '',
        outTime: '',
        transport: '',
        purpose: '',
      });
      navigation.navigate('ApplicationsPage');
    } catch (error) {
      console.error('Error:', error);
    }
  };
  
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Create New Outpass</Text>
      <Image source={home} style={styles.image} />
      <View style={styles.inputView}>
        <TextInput
          style={styles.input}
          placeholder="Destination"
          value={formData.destination}
          onChangeText={(text) => handleInputChange('destination', text)}
        />
        <TextInput
          style={styles.input}
          placeholder="Out Date"
          value={formData.outDate}
          onChangeText={(text) => handleInputChange('outDate', text)}
        />
        <TextInput
          style={styles.input}
          placeholder="Out Time"
          value={formData.outTime}
          onChangeText={(text) => handleInputChange('outTime', text)}
        />
        <TextInput
          style={styles.input}
          placeholder="Transport"
          value={formData.transport}
          onChangeText={(text) => handleInputChange('transport', text)}
        />
        <TextInput
          style={styles.input}
          placeholder="Purpose"
          value={formData.purpose}
          onChangeText={(text) => handleInputChange('purpose', text)}
        />
        <Button mode="contained" onPress={handleSubmit} style={styles.button}>
          Submit
        </Button>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  image: {
    width: 200,
    height: 200,
  },
  inputView: {
    width: '80%',
  },
  input: {
    marginBottom: 10,
  },
  button: {
    marginTop: 20,
  },
});

export default Home;
