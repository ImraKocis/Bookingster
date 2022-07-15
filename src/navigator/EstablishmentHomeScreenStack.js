import { View, Text } from 'react-native';
import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import EstablishmentObjectsScreen from '../components/establishmentOwner/userObjectsScreen/EstablishmentObjectsScreen';
import EstablishmentOwnerHomeScreen from '../components/establishmentOwner/EstablishmentOwnerHomeScreen';

const Stack = createStackNavigator();
function EstablishmentHomeScreenStack() {
  return (
    <Stack.Navigator initialRouteName="UsersEstablishments">
      <Stack.Screen
        options={{ headerShown: false }}
        name="UsersEstablishments"
        component={EstablishmentObjectsScreen}
      />
      <Stack.Screen
        options={{ headerShown: false }}
        name="EstablishmentTablesScreen"
        component={EstablishmentOwnerHomeScreen}
      />
    </Stack.Navigator>
  );
}

export default EstablishmentHomeScreenStack;
