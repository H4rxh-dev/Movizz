import { StyleSheet, Text } from 'react-native';
import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Home from './src/screen/Home';
import Profile from './src/screen/Profile';
import Fav from './src/screen/Fav';
import Watchlist from './src/screen/Watchlist';
import Icon from 'react-native-vector-icons/Feather';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

const Botttomtab = () => {
  const insets = useSafeAreaInsets();
  const Tab = createBottomTabNavigator();

  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarStyle: {
          position: 'absolute',
          bottom: insets.bottom,
          left: 20,
          borderTopWidth:0,
          right: 20,
          height: 75,
          backgroundColor: '#1b252b', // dark tab background
          borderTopLeftRadius: 20,
          borderTopRightRadius: 20,
          elevation: 5,
          shadowColor: '#000',
          shadowOpacity: 0.1,
          shadowOffset: { width: 0, height: 4 },
          shadowRadius: 8,
        },
        tabBarIcon: ({ focused }) => {
          let iconName;

          if (route.name === 'Home') iconName = 'home';
          else if (route.name === 'Fav') iconName = 'heart';
          else if (route.name === 'Watchlist') iconName = 'bookmark';
          else if (route.name === 'Profile') iconName = 'user';

          return (
            <Icon
              name={iconName}
              size={22}
              color={focused ? '#fcfffd' : 'gray'}
              style={{ marginBottom: -2 }}
            />
          );
        }, tabBarLabel: ({ focused }) => (
          <Text
            style={{
              fontSize: 10,
              color: focused ? '#fcfffd' : 'gray',
              marginTop: 2,
              textAlign: 'center',
            }}
          >
            {route.name}
          </Text>
        )
       
      })}
    >
      <Tab.Screen
//    options={{
//      tabBarLabel: ({ focused }) => (
//           <Text
//             style={{
//               fontSize: 10,
//               color: focused ? '#fcfffd' : 'gray',
            
//             }}
//           >
//         Home
//           </Text>
//         )
//    }} 
      name="Home" component={Home} />
      <Tab.Screen name="Fav" component={Fav} />
      <Tab.Screen name="Watchlist" component={Watchlist} />
      <Tab.Screen name="Profile" component={Profile} />
    </Tab.Navigator>
  );
};

export default Botttomtab;

const styles = StyleSheet.create({});
