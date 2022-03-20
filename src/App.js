/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import TokoTabs from './config/routes/TokoTabs';
import AuthStackScreen from './config/routes/AuthStackScreen';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome';
import SalesTabs from './config/routes/SalesTabs';
import Splash from './pages/Splash';
import {AuthContext} from './config/context';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function App() {
  // const [isLoading, setIsLoading] = React.useState(true);
  // const [user, setUser] = React.useState('toko');
  // const [userToken, setUserToken] = React.useState(null);

  initialLoginState = {
    isLoading: true,
    user: null,
    userToken: null,
  };

  const loginReducer = (prevState, action) => {
    switch (action.type) {
      case 'RETRIEVE_TOKEN':
        return {
          ...prevState,
          user: action.id,
          userToken: action.token,
          isLoading: false,
        };
      case 'LOGIN':
        return {
          ...prevState,
          user: action.id,
          userToken: action.token,
          isLoading: false,
        };
      case 'LOGOUT':
        return {
          ...prevState,
          user: null,
          userToken: null,
          isLoading: false,
        };
      case 'REGIS':
        return {
          ...prevState,
          user: action.id,
          userToken: action.token,
          isLoading: false,
        };
    }
  };

  const [loginState, dispatch] = React.useReducer(
    loginReducer,
    initialLoginState,
  );

  const AllStack = createStackNavigator();
  const AllStackScreen = ({userToken, user}) => {
    if (userToken) {
      if (user == 'toko') {
        return (
          <AllStack.Navigator headerMode="none">
            <AllStack.Screen name="Toko" component={TokoTabs} />
          </AllStack.Navigator>
        );
      } else if (user == 'sales') {
        return (
          <AllStack.Navigator headerMode="none">
            <AllStack.Screen name="Sales" component={SalesTabs} />
          </AllStack.Navigator>
        );
      }
    } else {
      return (
        <AllStack.Navigator headerMode="none">
          <AllStack.Screen name="Auth" component={AuthStackScreen} />
        </AllStack.Navigator>
      );
    }
  };

  const authContext = React.useMemo(() => {
    return {
      logIn: async ({token, role, profile, user}) => {
        // setIsLoading(false);
        // setUserToken(token);
        // setUser(role);
        try {
          await AsyncStorage.setItem('userToken', token);
          await AsyncStorage.setItem('role', role);
          await AsyncStorage.setItem('profile', JSON.stringify(profile));
          await AsyncStorage.setItem('user', JSON.stringify(user));
        } catch (e) {
          console.log(e);
        }
        dispatch({type: 'LOGIN', id: role, token: token});
      },
      regis: ({token, role}) => {
        // setIsLoading(false);
        // setUserToken(token);
        // setUser(role);
        dispatch({type: 'REGIS', id: role, token: token});
      },
      logOut: async () => {
        // setIsLoading(false);
        // setUserToken(null);
        // setUser(null);
        try {
          await AsyncStorage.removeItem('userToken');
          await AsyncStorage.removeItem('role');
          await AsyncStorage.removeItem('profile');
          await AsyncStorage.removeItem('user');
        } catch (e) {
          console.log(e);
        }
        dispatch({type: 'LOGOUT'});
      },
    };
  }, []);

  React.useEffect(() => {
    setTimeout(async () => {
      // setIsLoading(false);
      let tempToken = loginState.userToken;
      let tempUser = loginState.user;
      let tempProfile = null;
      let temp = null;
      try {
        tempToken = await AsyncStorage.getItem('userToken');
        tempUser = await AsyncStorage.getItem('role');
        tempProfile = await AsyncStorage.getItem('profile');
      } catch (e) {
        console.log(e);
      }
      dispatch({type: 'RETRIEVE_TOKEN', id: tempUser, token: tempToken});
    }, 1000);
  }, []);

  if (loginState.isLoading) {
    return <Splash />;
  }

  return (
    <AuthContext.Provider value={authContext}>
      <NavigationContainer>
        <AllStackScreen
          userToken={loginState.userToken}
          user={loginState.user}
        />
      </NavigationContainer>
    </AuthContext.Provider>
  );
}
