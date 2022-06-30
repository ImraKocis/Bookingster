import React from 'react';
import Icons from 'react-native-vector-icons/Ionicons';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import loginStyle from '../components/login/loginStyle';
import { primary } from '../assets/getColors';
import EstablishmentOwnerHomeScreen from '../components/establishmentOwner/EstablishmentOwnerHomeScreen';

const Tab = createBottomTabNavigator();

function EstablishmentOwnerTabNavigator() {
  const renderIcon = (focused, color, route, size) => {
    let iconName;
    if (route.name === 'Početna') {
      iconName = focused ? 'ios-home' : 'ios-home-outline';
    } else if (route.name === 'Rezervacije') {
      iconName = focused ? 'bookmark' : 'bookmark-outline';
    } else if (route.name === 'Objekti') {
      iconName = focused ? 'restaurant' : 'restaurant-outline';
    } else if (route.name === 'Račun') {
      iconName = focused ? 'person' : 'person-outline';
    }

    return <Icons name={iconName} size={size} color={color} />;
  };

  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarStyle: { elevation: 6, borderTopLeftRadius: 20, borderTopRightRadius: 20 },
        tabBarHideOnKeyboard: true,
        tabBarIcon: ({ focused, color, size }) => renderIcon(focused, color, route, size),
        tabBarActiveTintColor: primary,
        tabBarInactiveTintColor: 'black',
      })}
    >
      <Tab.Screen name="Početna" component={EstablishmentOwnerHomeScreen} />
      <Tab.Screen name="Rezervacije" component={EstablishmentOwnerHomeScreen} />
      <Tab.Screen name="Objekti" component={EstablishmentOwnerHomeScreen} />
      <Tab.Screen name="Račun" component={EstablishmentOwnerHomeScreen} />
    </Tab.Navigator>
  );
}

export default EstablishmentOwnerTabNavigator;
