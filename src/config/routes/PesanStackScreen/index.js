import { createStackNavigator } from '@react-navigation/stack';
import * as React from 'react';
import KeranjangPage from '../../../pages/KeranjangPage';


const PesanStack = createStackNavigator();

function PesanStackScreen() {
  return (
    <PesanStack.Navigator screenOptions={{
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
      <PesanStack.Screen name="KeranjangPage" component={KeranjangPage} />
    </PesanStack.Navigator>
  );
}

export default PesanStackScreen;