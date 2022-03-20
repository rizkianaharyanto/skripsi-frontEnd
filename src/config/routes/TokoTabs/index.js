
/**
 * Sample React Native N
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

 import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
 import { NavigationContainer } from '@react-navigation/native';
 import React from 'react';
 import HomeStackScreen from './../HomeStackScreen';
 import AktivitasStackScreen from './../AktivitasStackScreen';
 import PesanStackScreen from './../PesanStackScreen';
 import AkunStackScreen from './../AkunStackScreen';
 import FontAwesome5 from 'react-native-vector-icons/FontAwesome';
 
 const Tab = createBottomTabNavigator();
 
 export default function TokoTabs() {
   return (
       <Tab.Navigator 
         screenOptions={({ route }) => ({
           tabBarIcon: ({ focused, color, size }) => {
             let iconName;
             if (route.name === 'Beranda') {
                 iconName = focused ? 'home' : 'home';
                 size = focused ? 30 : 20;
               } else if (route.name === 'Aktivitas') {
                 iconName = focused ? 'list-ul' : 'list-ul';
                 size = focused ? 30 : 20;
               } else if (route.name === 'Pesan') {
                 iconName = focused ? 'shopping-cart' : 'shopping-cart';
                 size = focused ? 30 : 20;
               } else if (route.name === 'Akun') {
                 iconName = focused ? 'user' : 'user';
                 size = focused ? 30 : 20;
               }
               return <FontAwesome5 name={iconName} size={size} color={color}/>;
           },
         })}
         tabBarOptions={{
           activeTintColor: '#00AA13',
           inactiveTintColor: 'gray',
         }}
       >
         <Tab.Screen name="Beranda" component={HomeStackScreen} />
         <Tab.Screen name="Aktivitas" component={AktivitasStackScreen} />
         <Tab.Screen name="Pesan" component={PesanStackScreen} />
         <Tab.Screen name="Akun" component={AkunStackScreen} />
       </Tab.Navigator>
   );
 }
 
 
 
 