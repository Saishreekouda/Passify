
import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import Splash from "./components/Splash";
import Login from "./components/Login";
import Application from "./components/Application";
import ApplicationsPage from "./components/ApplicationsPage";
import ProfileScreen from "./components/Profile";


export default function App() {
  return (

  <ProfileScreen/>
   
  
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
// container: {
//   flex: 1,
//   backgroundColor: '#fff',
//   alignItems: 'center',
//   justifyContent: 'center',
// },
// });
