import { createStackNavigator } from '@react-navigation/stack';
import * as React from 'react';
import salesHome from '../../../salesPages/salesHome';
import salesProductPage from '../../../salesPages/salesProductPage';
import salesTokoPage from '../../../salesPages/salesTokoPage';


const salesHomeStack = createStackNavigator();

function SlsHomeStackScreen() {
  return (
    <salesHomeStack.Navigator screenOptions={{
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
      <salesHomeStack.Screen name="salesHome" component={salesHome} />
      <salesHomeStack.Screen name="salesProductPage" component={salesProductPage} />
      <salesHomeStack.Screen name="salesTokoPage" component={salesTokoPage} />
    </salesHomeStack.Navigator>
  );
}

export default SlsHomeStackScreen;