import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import Choice from '../components/choice/Choice';
import SignUp from '../components/signup/SignUp';

const Stack = createStackNavigator();

const ChoiceScreenNavigator = () => {
  return (
    <Stack.Navigator initialRouteName="Choice">
      <Stack.Screen
        options={{headerShown: false}}
        name="Choice"
        component={Choice}></Stack.Screen>
      <Stack.Screen options={{headerShown: false}} name="Novi_racun_ugostitelj">
        {props => <SignUp {...props} signUpType={'ugostitelj'} />}
      </Stack.Screen>
      <Stack.Screen options={{headerShown: false}} name="Novi_racun_korisnik">
        {props => <SignUp {...props} signUpType={'korisnik'} />}
      </Stack.Screen>
    </Stack.Navigator>
  );
};

export default ChoiceScreenNavigator;
