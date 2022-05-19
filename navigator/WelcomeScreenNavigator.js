import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import Welcome from '../components/welcome/Welcome';
import Login from '../components/login/Login';
import ChoiceScreenNavigator from './ChoiceScreenNavigator';

const Stack = createStackNavigator();

const WelcomeScreenNavigator = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Welcome">
        <Stack.Screen
          options={{headerShown: false}}
          name="Welcome"
          component={Welcome}></Stack.Screen>
        <Stack.Screen
          options={{headerShown: false}}
          name="Prijava"
          component={Login}></Stack.Screen>
        <Stack.Screen
          options={{headerShown: false}}
          name="Choice"
          component={ChoiceScreenNavigator}></Stack.Screen>
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default WelcomeScreenNavigator;