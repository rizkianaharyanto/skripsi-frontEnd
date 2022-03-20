import {createStackNavigator} from '@react-navigation/stack';
import * as React from 'react';
import AkunPage from '../../../pages/AkunPage';
import ChangePasswordPage from '../../../pages/ChangePasswordPage';
import UpdateProfilePage from '../../../pages/UpdateProfilePage';

const AkunStack = createStackNavigator();

function AkunStackScreen() {
  return (
    <AkunStack.Navigator
      screenOptions={{
        title: 'onSales',
        headerStyle: {
          borderBottomWidth: 1,
          borderBottomColor: 'whitesmoke',
          backgroundColor: 'white',
          // backgroundColor : '#00AA13'
        },
        headerTintColor: '#00AA13',
        // headerTintColor: 'white',
        headerTitleStyle: {
          fontWeight: 'bold',
        },
      }}>
      <AkunStack.Screen name="AkunPage" component={AkunPage} />
      <AkunStack.Screen
        name="UpdateProfilePage"
        component={UpdateProfilePage}
      />
      <AkunStack.Screen
        name="ChangePasswordPage"
        component={ChangePasswordPage}
      />
    </AkunStack.Navigator>
  );
}

export default AkunStackScreen;
