
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


export default function App() {
  return (
    <SafeAreaProvider>
    {/* <View style={styles.container}> */}
      
      <ApplicationsPage/>
    {/* </View> */}
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