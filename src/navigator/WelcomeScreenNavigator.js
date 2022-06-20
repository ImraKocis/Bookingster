import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import Welcome from '../components/welcome/Welcome';
import Login from '../components/login/Login';
import ChoiceScreenNavigator from './ChoiceScreenNavigator';

const Stack = createStackNavigator();

const WelcomeScreenNavigator = ({setUserInfo, setIsNewUser}) => {
  // const [set]
  return (
    <Stack.Navigator initialRouteName="Welcome">
      <Stack.Screen
        options={{headerShown: false}}
        name="Welcome"
        component={Welcome}></Stack.Screen>
      <Stack.Screen options={{headerShown: false}} name="Prijava">
        {props => (
          <Login
            {...props}
            setIsNewUser={setIsNewUser}
            setUserInfo={setUserInfo}
          />
        )}
      </Stack.Screen>
      <Stack.Screen options={{headerShown: false}} name="Choice_navigator">
        {props => (
          <ChoiceScreenNavigator {...props} setUserInfo={setUserInfo} />
        )}
      </Stack.Screen>
    </Stack.Navigator>
  );
};

export default WelcomeScreenNavigator;
