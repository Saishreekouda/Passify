import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';
import Navbar from './Navbar';
import { SafeAreaProvider } from 'react-native-safe-area-context';

const ProfileScreen = () => {
  return (
    <SafeAreaProvider>
    <View style={styles.container}>
      <View style={styles.avatarContainer}>
        <Image
          source={{ uri: 'https://www.bootdey.com/img/Content/avatar/avatar6.png' }}
          style={styles.avatar}
        />
        <Text style={styles.name}>Jane Doe</Text>
      </View>
      <View style={styles.infoContainer}>
        <Text style={styles.infoLabel}>Roll Number:</Text>
        <Text style={styles.infoValue}>IIT2021061</Text>
      </View>
      <View style={styles.infoContainer}>
        <Text style={styles.infoLabel}>Semester:</Text>
        <Text style={styles.infoValue}>3rd</Text>
      </View>
      <View style={styles.infoContainer}>
        <Text style={styles.infoLabel}>Program:</Text>
        <Text style={styles.infoValue}>Information Technology</Text>
      </View>
      <View style={styles.infoContainer}>
        <Text style={styles.infoLabel}>Phone:</Text>
        <Text style={styles.infoValue}>9417927979</Text>
      </View>
      {/* Bio */}
      <View style={styles.infoContainer}>
        <Text style={styles.infoLabel}>Bio:</Text>
        <Text style={styles.infoValue}>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin ornare magna eros, eu pellentesque tortor vestibulum ut. Maecenas non massa sem. Etiam finibus odio quis feugiat facilisis.
        </Text>
      </View>
      <View style={styles.navbar}>
      <Navbar/>
      </View>
      
     
      
    </View>
    </SafeAreaProvider>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 20,
    paddingBottom:0
  },
  avatarContainer: {
    alignItems: 'center',
    marginTop: 20,
  },
  avatar: {
    width: 150,
    height: 150,
    borderRadius: 75,
  },
  name: {
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: 10,
  },
  infoContainer: {
    marginTop: 20,
  },
  infoLabel: {
    fontWeight: 'bold',
  },
  infoValue: {
    marginTop: 5,
  },
    navbar: {
        flex:1,
        marginLeft:-20,
        marginRight:-20
    },
 
});

export default ProfileScreen;
