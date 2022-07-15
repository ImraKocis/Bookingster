import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import Choice from '../components/choice/Choice';
import SignUp from '../components/signup/SignUp';
import AppContext from './AppContext';

const Stack = createStackNavigator();

function ContextChoice({ navigation, route }) {
  return (
    <AppContext.Consumer>
      {({ setUserInfo, isNewUser }) => (
        <Choice
          navigation={navigation}
          route={route}
          setUserInfo={setUserInfo}
          isNewUser={isNewUser}
        />
      )}
    </AppContext.Consumer>
  );
}
function ContextSignUpUser({ navigation, route }) {
  return (
    <AppContext.Consumer>
      {({ setUserInfo }) => (
        <SignUp navigation={navigation} route={route} setUserInfo={setUserInfo} signUpType={0} />
      )}
    </AppContext.Consumer>
  );
}
function ContextSignUpEstablishmentOwner({ navigation, route }) {
  return (
    <AppContext.Consumer>
      {({ setUserInfo }) => (
        <SignUp navigation={navigation} route={route} setUserInfo={setUserInfo} signUpType={1} />
      )}
    </AppContext.Consumer>
  );
}

function ChoiceScreenNavigator() {
  return (
    <Stack.Navigator initialRouteName="Choice">
      <Stack.Screen options={{ headerShown: false }} name="Choice" component={ContextChoice} />
      <Stack.Screen
        options={{ headerShown: false }}
        name="Novi_racun_korisnik"
        component={ContextSignUpUser}
      />
      <Stack.Screen
        options={{ headerShown: false }}
        name="Novi_racun_ugostitelj"
        component={ContextSignUpEstablishmentOwner}
      />
    </Stack.Navigator>
  );
}

export default ChoiceScreenNavigator;
