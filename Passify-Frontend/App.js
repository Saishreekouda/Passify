
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import Navbar from './components/Navbar';
// import { SafeAreaProvider } from 'react-native-safe-area-context';

export default function App() {
  return (
    <View style={styles.container}>
    
      <Text style={styles.text}>hi</Text>
    </View>
   
  
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    color: 'black'
  }
});