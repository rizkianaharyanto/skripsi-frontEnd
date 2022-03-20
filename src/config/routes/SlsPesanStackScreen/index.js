import { createStackNavigator } from '@react-navigation/stack';
import * as React from 'react';
import salesPesanPage from '../../../salesPages/salesPesanPage';


const salesPesanStack = createStackNavigator();

function SlsPesanStackScreen() {
  return (
    <salesPesanStack.Navigator screenOptions={{
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
      <salesPesanStack.Screen name="salesPesanPage" component={salesPesanPage} />
    </salesPesanStack.Navigator>
  );
}

export default SlsPesanStackScreen;