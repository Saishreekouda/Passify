
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import Navbar from './components/Navbar';
import Outpass from './components/Outpass';
import { SafeAreaProvider } from 'react-native-safe-area-context';


export default function App() {
  return (
    <SafeAreaProvider>
    {/* <View style={styles.container}> */}
      
      <Outpass
      dateOfEvent="12-03-2024" destination="Pune" transport="Bus" outTime="6: 00pm" issuedBy="Kundu Ma'am" purpose="Party" issueDate="1-02-2024" issueTime="4:00pm" tag="Accepted"
      />
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