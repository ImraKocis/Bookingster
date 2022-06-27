import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import Welcome from '../components/welcome/Welcome';
import Login from '../components/login/Login';
import ChoiceScreenNavigator from './ChoiceScreenNavigator';
import AppContext from './AppContext';

const Stack = createStackNavigator();

function ContextLogin({ navigation, route }) {
  return (
    <AppContext.Consumer>
      {({ setUserInfo, setIsNewUser }) => (
        <Login
          navigation={navigation}
          route={route}
          setIsNewUser={setIsNewUser}
          setUserInfo={setUserInfo}
        />
      )}
    </AppContext.Consumer>
  );
}

function WelcomeScreenNavigator() {
  return (
    <Stack.Navigator initialRouteName="Welcome">
      <Stack.Screen options={{ headerShown: false }} name="Welcome" component={Welcome} />
      <Stack.Screen options={{ headerShown: false }} name="Prijava" component={ContextLogin} />
      <Stack.Screen
        options={{ headerShown: false }}
        name="Choice_navigator"
        component={ChoiceScreenNavigator}
      />
    </Stack.Navigator>
  );
}

export default WelcomeScreenNavigator;
