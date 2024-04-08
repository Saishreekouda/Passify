import { StatusBar } from 'expo-status-bar';
import {Image, StyleSheet, Text, View } from 'react-native';
import logo from '../assets/logo.png';

import React, { useEffect } from 'react';


export default function Splash({ navigation }) {
//   useEffect(() => {
//     setTimeout(() => {
//       navigation.replace('Login'); 
//     }, 2000);
//   }, []);

  return (
    <View style={styles.container}>
      <Image source={logo} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'plum',
    alignItems: 'center',
    justifyContent: 'center',
  },
});