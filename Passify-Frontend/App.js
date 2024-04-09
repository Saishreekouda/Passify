
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import Navbar from './components/Navbar';
import Outpass from './components/Outpass';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import Splash from "./components/Splash";
import Login from "./components/Login";
import Application from "./components/Application";
import ApplicationsPage from "./components/ApplicationsPage";
import ProfileScreen from "./components/Profile";
import AdminHome from './components/AdminHome';

import Home from './components/AdminHome';
export default function App() {
  return (
    <SafeAreaProvider>
   
      {/* <Outpass
      dateOfEvent="12th March 2024" 
      transport="Bus" 
      outTime="2pm" 
      issuedBy="K Kundu" 
      purpose="Party" 
      tag="pending"
      name="Saishree"
      rollno="IIT2021009" 
      destination="Civil Lines" 
      issueTime="4pm"
      status="Pending"
       ssuedate="12th march" /> */}


       <AdminHome/>
    
   </SafeAreaProvider>
  
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});