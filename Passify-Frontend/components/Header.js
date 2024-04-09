import { StatusBar } from "expo-status-bar";
import { ScrollView, StyleSheet, Text, View } from "react-native";
import { Appbar } from 'react-native-paper';

import Icon from "react-native-vector-icons/FontAwesome";

export default function Header({title}) {
    const _goBack = () => console.log('Went back');

    
  return (
    
    <Appbar.Header mode="center-aligned">
      <Appbar.BackAction onPress={_goBack} />
      <Appbar.Content title={title} />
     
    </Appbar.Header>
       
    
  );
}

const styles = StyleSheet.create({
    
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
    paddingTop: StatusBar.currentHeight,
  },

  title: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#370556",
  },

  top:{
    flexDirection: "row",
    justifyContent: "",
    alignItems: "center"
  }
});
