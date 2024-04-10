import React, { useState, useEffect } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createStackNavigator } from "@react-navigation/stack";
import AsyncStorage from '@react-native-async-storage/async-storage';
import Splash from "./components/Splash";
import Login from "./components/Login";
import Home from "./components/Home";
import ProfileScreen from "./components/Profile";
import ApplicationsPage from "./components/ApplicationsPage";
import Outpass from "./components/Outpass";
import Icon from "react-native-vector-icons/FontAwesome";
const Tab = createBottomTabNavigator();

function MainTabNavigator() {
  const [role, setRole] = useState("student");

  useEffect(() => {
    const retrieveStudentLogin = async () => {
      try {
        console.log("Fetching role");
        const role = await AsyncStorage.getItem("role");
        console.log("Role: ", role);
        setRole(role);
      } catch (error) {
        console.error(error);
      }
    };

    retrieveStudentLogin();
  }, []);

  return (
    <Tab.Navigator>
      <Tab.Screen name="Home" component={Home}
      
       />
      
      <Tab.Screen
        name="Applications"
        component={ApplicationNavigator}
        />
      <Tab.Screen name="Profile" component={ProfileScreen} />
    </Tab.Navigator>
  );
}

// Create a stack navigator for screens that should not have the tab bar
const AuthStack = createStackNavigator();

function AuthNavigator() {
  return (
    <AuthStack.Navigator>
      <AuthStack.Screen
        name="Splash"
        component={Splash}
        options={{ headerShown: false }}
      />
      <AuthStack.Screen
        name="Login"
        component={Login}
        options={{ headerShown: false }}
      />
      <AuthStack.Screen
        name="Main"
        component={MainTabNavigator}
        options={{ headerShown: false }}
      />
    </AuthStack.Navigator>
  );
}

// Create a stack navigator for the outpass page
const ApplicationStack = createStackNavigator();
function ApplicationNavigator() {
  return (
    <ApplicationStack.Navigator>
      <ApplicationStack.Screen
        name="ApplicationsPage"
        component={ApplicationsPage}
        options={{ headerShown: false }}
      />
      <ApplicationStack.Screen
        name="Outpass"
        component={Outpass}
        options={{ headerShown: false }}
      />
    </ApplicationStack.Navigator>
  );
}

// Create the root navigator
const RootStack = createStackNavigator();
export default function App() {
  return (
    <NavigationContainer>
      <RootStack.Navigator>
        <RootStack.Screen
          name="Auth"
          component={AuthNavigator}
          options={{ headerShown: false }}
        />
        <RootStack.Screen
          name="Main"
          component={MainTabNavigator}
          options={{ headerShown: false }}
        />
        <RootStack.Screen
          name="Applications"
          component={ApplicationNavigator}
          options={{ headerShown: false }}
        />
      </RootStack.Navigator>
    </NavigationContainer>
  );
}
