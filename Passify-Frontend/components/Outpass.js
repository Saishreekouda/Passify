import React from 'react'
import { Text } from 'react-native';
export default function outpass() {
  return (
    <View style={styles.container}>
      <outpass/>
      <Text style={styles.text}>hi</Text>
    </View>
  )
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