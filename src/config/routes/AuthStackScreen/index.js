import { createStackNavigator } from '@react-navigation/stack';
import * as React from 'react';
import Login from "./../../../pages/Login";
import Regis from "./../../../pages/Regis";
import Resubmission from "./../../../pages/Regis/resubmission";

const AuthStack = createStackNavigator();

function AuthStackScreen() {
  return (
    <AuthStack.Navigator screenOptions={{
      headerShown: false
    }}>
      <AuthStack.Screen name="Login" component={Login} />
      <AuthStack.Screen name="Regis" component={Regis} />
      <AuthStack.Screen name="Resubmission" component={Resubmission} />
    </AuthStack.Navigator>
  );
}

export default AuthStackScreen;