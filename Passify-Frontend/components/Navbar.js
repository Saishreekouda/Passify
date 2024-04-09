import React from 'react';
import { BottomNavigation, Text } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native'; // Import the useNavigation hook
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Home from './Home';
import ApplicationsPage from './ApplicationsPage';
import ProfileScreen from './Profile';

const Navbar = () => {
  
  return (
    <NavigationContainer>
      <Tab.Navigator
        initialRouteName={homeName}
        screenOptions={({ route }) => ({
          tabBarIcon: ({ focused, color, size }) => {
            let iconName;
            let rn = route.name;

            if (rn === homeName) {
              iconName = focused ? 'home' : 'home-outline';

            } else if (rn === detailsName) {
              iconName = focused ? 'list' : 'list-outline';

            } else if (rn === settingsName) {
              iconName = focused ? 'settings' : 'settings-outline';
            }

            // You can return any component that you like here!
            return <Ionicons name={iconName} size={size} color={color} />;
          },
        })}
        tabBarOptions={{
          activeTintColor: 'tomato',
          inactiveTintColor: 'grey',
          labelStyle: { paddingBottom: 10, fontSize: 10 },
          style: { padding: 10, height: 70}
        }}>

        <Tab.Screen name={"Home"} component={Home} />
        <Tab.Screen name={"ApplicationsPage"} component={ApplicationsPage} />
        <Tab.Screen name={"ProfileScreen"} component={ProfileScreen} />

      </Tab.Navigator>
    </NavigationContainer>
  );
};

export default Navbar;
