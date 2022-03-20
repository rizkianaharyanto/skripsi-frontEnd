import { createStackNavigator } from '@react-navigation/stack';
import * as React from 'react';
import DistributorPage from '../../../pages/DistributorPage';
import Home from '../../../pages/Home';
import ProductPage from '../../../pages/ProductPage';
import Search from '../../../pages/Search';


const HomeStack = createStackNavigator();

function HomeStackScreen() {
  return (
    <HomeStack.Navigator screenOptions={{
      title: 'onSales',
      headerStyle: {
        borderBottomWidth: 1, 
        borderBottomColor : 'whitesmoke', 
        backgroundColor : 'white',
        // backgroundColor : '#00AA13'
      },
      headerTintColor: '#00AA13',
      // headerTintColor: 'white',
      headerTitleStyle: {
        fontWeight : 'bold', 
        
      },
    }}>
      <HomeStack.Screen name="Home" component={Home} />
      <HomeStack.Screen name="Search" component={Search} />
      <HomeStack.Screen name="ProductPage" component={ProductPage} />
      <HomeStack.Screen name="DistributorPage" component={DistributorPage} />
    </HomeStack.Navigator>
  );
}

export default HomeStackScreen;