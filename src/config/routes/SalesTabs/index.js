/**
 * Sample React Native N
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {NavigationContainer} from '@react-navigation/native';
import React from 'react';
import SlsHomeStackScreen from './../SlsHomeStackScreen';
import SlsAktivitasStackScreen from './../SlsAktivitasStackScreen';
import SlsPesanStackScreen from './../SlsPesanStackScreen';
import AkunStackScreen from './../AkunStackScreen';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome';

const TabSales = createBottomTabNavigator();

export default function SalesTabs() {
  return (
    <TabSales.Navigator
      screenOptions={({route}) => ({
        tabBarIcon: ({focused, color, size}) => {
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
          return <FontAwesome5 name={iconName} size={size} color={color} />;
        },
      })}
      tabBarOptions={{
        activeTintColor: '#00AA13',
        inactiveTintColor: 'gray',
      }}>
      <TabSales.Screen name="Beranda" component={SlsHomeStackScreen} />
      <TabSales.Screen name="Aktivitas" component={SlsAktivitasStackScreen} />
      <TabSales.Screen name="Pesan" component={SlsPesanStackScreen} />
      <TabSales.Screen name="Akun" component={AkunStackScreen} />
    </TabSales.Navigator>
  );
}
