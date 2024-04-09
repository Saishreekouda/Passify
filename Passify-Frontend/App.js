import { StatusBar } from "expo-status-bar";
import React from "react";
import { StyleSheet,Text, View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import Navbar from './components/Navbar';
import Outpass from './components/Outpass';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import Splash from "./components/Splash";
import Login from "./components/Login";
import Application from "./components/Application";
import ApplicationsPage from "./components/ApplicationsPage";
import Profile from "./components/Profile";
import Home from "./components/Home";
import ProfileScreen from "./components/Profile";

const Stack = createStackNavigator();

export default function App() {
  return (
    // <ProfileScreen/>
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Splash">
        <Stack.Screen name="Splash" component={Splash} options={{ headerShown: false }} />
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="Application" component={Application} />
        <Stack.Screen name="ApplicationsPage" component={ApplicationsPage} />
        <Stack.Screen name="Profile" component={Profile} />
        <Stack.Screen name="Outpass" component={Outpass} initialParams={{}}/>
        <Stack.Screen name="Home" component={Home} />
      </Stack.Navigator>
      <StatusBar style="auto" />
    </NavigationContainer>
  )};



const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});


