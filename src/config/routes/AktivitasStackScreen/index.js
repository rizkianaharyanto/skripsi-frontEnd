import { createStackNavigator } from '@react-navigation/stack';
import * as React from 'react';
import AktivitasPage from '../../../pages/AktivitasPage';
import InvoicePage from '../../../pages/InvoicePage';
import DistributorPage from '../../../pages/DistributorPage';
import ProductPage from '../../../pages/ProductPage';


const AktivitasStack = createStackNavigator();

function AktivitasStackScreen() {
  return (
    <AktivitasStack.Navigator screenOptions={{
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
      <AktivitasStack.Screen name="AktivitasPage" component={AktivitasPage} />
      <AktivitasStack.Screen name="InvoicePage" component={InvoicePage} />
      <AktivitasStack.Screen name="DistributorPage" component={DistributorPage} />
      <AktivitasStack.Screen name="ProductPage" component={ProductPage} />
    </AktivitasStack.Navigator>
  );
}

export default AktivitasStackScreen;