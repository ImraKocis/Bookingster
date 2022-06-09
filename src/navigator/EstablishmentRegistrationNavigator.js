import {View, Text} from 'react-native';
import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';

import SignUp from '../components/signup/SignUp';
import Hint from '../components/ugostiteljForm/hint/Hint';
import EstablishmentRegistrationForm from '../components/ugostiteljForm/EstablishmentRegistrationForm';
const Stack = createStackNavigator();
const EstablishmentRegistrationNavigator = () => {
  return (
    <Stack.Navigator initialRouteName="Pero">
      <Stack.Screen
        options={{headerShown: false}}
        name="Pero"
        component={EstablishmentRegistrationForm}></Stack.Screen>
      <Stack.Screen options={{headerShown: false}} name="Pomoć">
        {props => <Hint {...props} currentPosition={0} />}
      </Stack.Screen>
      <Stack.Screen options={{headerShown: false}} name="Osobni_podaci">
        {props => <Hint {...props} currentPosition={1} />}
      </Stack.Screen>
      <Stack.Screen options={{headerShown: false}} name="Radno_vrijeme">
        {props => <Hint {...props} currentPosition={2} />}
      </Stack.Screen>
      <Stack.Screen options={{headerShown: false}} name="Stolovi">
        {props => <Hint {...props} currentPosition={3} />}
      </Stack.Screen>
    </Stack.Navigator>
  );
};

export default EstablishmentRegistrationNavigator;
