// import * as React from 'react';
// import { BottomNavigation, Text } from 'react-native-paper';

// const HomeRoute = () => {null};

// const ApplicationsRoute = () => {null};

// const ProfileRoute = () => {null};

// const Navbar = () => {
//   const [index, setIndex] = React.useState(0);
//   const [routes] = React.useState([
//     { key: 'home', title: 'Home', focusedIcon: 'home', unfocusedIcon: 'home-outline'},
//     { key: 'applications', title: 'Applications', focusedIcon: 'apps-box', unfocusedIcon: 'apps'},
//     { key: 'profile', title: 'Profile', focusedIcon: 'account-circle', unfocusedIcon: 'account-circle-outline'},
//   ]);

//   const renderScene = BottomNavigation.SceneMap({
//     home: HomeRoute,
//     applications: ApplicationsRoute,
//     profile: ProfileRoute,
//   });

//   return (
//     <BottomNavigation
//       navigationState={{ index, routes }}
//       onIndexChange={setIndex}
//       renderScene={renderScene}
//     />
//   );
// };

// export default Navbar;
