import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createStackNavigator } from "@react-navigation/stack";
import { View, Text, StyleSheet } from "react-native";
import Splash from "./components/Splash";
import Login from "./components/Login";
import Home from "./components/Home";
import ProfileScreen from "./components/Profile";
import ApplicationsPage from "./components/ApplicationsPage";
import Outpass from "./components/Outpass";

// Create the tab navigator for home, profile, and applications page
const Tab = createBottomTabNavigator();
function MainTabNavigator() {
  return (
    <Tab.Navigator>
      <Tab.Screen name="Home" component={Home} />
      <Tab.Screen name="Profile" component={ProfileScreen} />
      <Tab.Screen
        name="Applications"
        component={ApplicationNavigator}
        // options={{ headerShown: false }}
      />
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
    // <ProfileScreen/>
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
// export default function App() {
//   return (
//     <NavigationContainer>
//       <Stack.Navigator initialRouteName="Splash">
//         <Stack.Screen
//           name="Splash"
//           component={Splash}
//           options={{ headerShown: false }}
//         />
//         <Stack.Screen name="Login" component={Login} />
//         <Stack.Screen name="Application" component={Application} />
//         <Stack.Screen name="ApplicationsPage" component={ApplicationsPage} />
//         <Stack.Screen name="Profile" component={Profile} />
//         <Stack.Screen name="Outpass" component={Outpass} initialParams={{}} />
//         <Stack.Screen name="Home" component={Home} />
//       </Stack.Navigator>
//       <StatusBar style="auto" />
//     </NavigationContainer>
//   );
// }

// function MyTabBar({ state, descriptors, navigation }) {
//   return (
//     <View style={{ flexDirection: "row" }}>
//       {state.routes.map((route, index) => {
//         const { options } = descriptors[route.key];
//         const label =
//           options.tabBarLabel !== undefined
//             ? options.tabBarLabel
//             : options.title !== undefined
//             ? options.title
//             : route.name;

//         const isFocused = state.index === index;

//         const onPress = () => {
//           const event = navigation.emit({
//             type: "tabPress",
//             target: route.key,
//           });

//           if (!isFocused && !event.defaultPrevented) {
//             navigation.navigate(route.name);
//           }
//         };

//         const onLongPress = () => {
//           navigation.emit({
//             type: "tabLongPress",
//             target: route.key,
//           });
//         };

//         return (
//           <TouchableOpacity
//             accessibilityRole="button"
//             accessibilityState={isFocused ? { selected: true } : {}}
//             accessibilityLabel={options.tabBarAccessibilityLabel}
//             testID={options.tabBarTestID}
//             onPress={onPress}
//             onLongPress={onLongPress}
//             style={{ flex: 1 }}
//           >
//             <Text style={{ color: isFocused ? "#673ab7" : "#222" }}>
//               {label}
//             </Text>
//           </TouchableOpacity>
//         );
//       })}
//     </View>
//   );
// }

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
