import { createStackNavigator } from '@react-navigation/stack';
import * as React from 'react';
import salesAktivitasPage from '../../../salesPages/salesAktivitasPage';
import salesInvoicePage from '../../../salesPages/salesInvoicePage';
import salesProductPage from '../../../salesPages/salesProductPage';


const salesAktivitasStack = createStackNavigator();

function SlsAktivitasStackScreen() {
  return (
    <salesAktivitasStack.Navigator screenOptions={{
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
      <salesAktivitasStack.Screen name="salesAktivitasPage" component={salesAktivitasPage} />
      <salesAktivitasStack.Screen name="salesInvoicePage" component={salesInvoicePage} />
      <salesAktivitasStack.Screen name="salesProductPage" component={salesProductPage} />
    </salesAktivitasStack.Navigator>
  );
}

export default SlsAktivitasStackScreen;