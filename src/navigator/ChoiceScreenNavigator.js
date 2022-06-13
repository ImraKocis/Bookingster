import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import Choice from '../components/choice/Choice';
import SignUp from '../components/signup/SignUp';

const Stack = createStackNavigator();

const ChoiceScreenNavigator = ({
  onAuthStateChanged,
  initializing,
  setUserInfo,
  isNewUser,
}) => {
  return (
    <Stack.Navigator initialRouteName="Choice">
      <Stack.Screen options={{headerShown: false}} name="Choice">
        {props => (
          <Choice {...props} setUserInfo={setUserInfo} isNewUser={isNewUser} />
        )}
      </Stack.Screen>
      <Stack.Screen options={{headerShown: false}} name="Novi_racun_ugostitelj">
        {props => (
          <SignUp
            {...props}
            setUserInfo={setUserInfo}
            onAuthStateChanged={onAuthStateChanged}
            initializing={initializing}
            signUpType={'1'}
          />
        )}
      </Stack.Screen>
      <Stack.Screen options={{headerShown: false}} name="Novi_racun_korisnik">
        {props => (
          <SignUp
            {...props}
            setUserInfo={setUserInfo}
            onAuthStateChanged={onAuthStateChanged}
            initializing={initializing}
            signUpType={'0'}
          />
        )}
      </Stack.Screen>
    </Stack.Navigator>
  );
};

export default ChoiceScreenNavigator;
