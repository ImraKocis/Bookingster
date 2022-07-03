import { View, Text } from 'react-native';
import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import AppContext from './AppContext';
import EstablishmentDetailsScreen from '../components/user/establishmentDetailsScreen/EstablishmentDetailsScreen';
// import ReservationScreen from '../components/user/reservationScreen/ReservationScreen';
import UserHomeScreen from '../components/user/userHomeScreen/UserHomeScreen';
import ReservationScreenNew from '../components/user/reservationScreen/ReservationScreenNew';

const Stack = createStackNavigator();

function EstablishmentObjectDetailsContext({ navigation, route }) {
  return (
    <AppContext.Consumer>
      {({ item }) => (
        <EstablishmentDetailsScreen item={item} route={route} navigation={navigation} />
      )}
    </AppContext.Consumer>
  );
}

function ReservationContext({ navigation, route }) {
  return (
    <AppContext.Consumer>
      {({ item }) => <ReservationScreenNew item={item} route={route} navigation={navigation} />}
    </AppContext.Consumer>
  );
}

function UserHomeStackScreenNavigator() {
  return (
    <Stack.Navigator initialRouteName="UserHomeScreen">
      <Stack.Screen
        options={{ headerShown: false }}
        name="UserHomeScreen"
        component={UserHomeScreen}
      />
      <Stack.Screen
        options={{ headerShown: false }}
        name="EstablishmentDetailsScreen"
        component={EstablishmentObjectDetailsContext}
      />
      <Stack.Screen
        options={{ headerShown: false }}
        name="ReservationScreen"
        component={ReservationContext}
      />
    </Stack.Navigator>
  );
}

export default UserHomeStackScreenNavigator;
