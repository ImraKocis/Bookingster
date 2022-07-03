import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Icons from 'react-native-vector-icons/Ionicons';
import UserHomeScreen from '../components/user/userHomeScreen/UserHomeScreen';
import { primary } from '../assets/getColors';
import UserBookingHistoryScreen from '../components/user/userBookingHistoryScreen/UserBookingHistoryScreen';
import UserProfileScreen from '../components/user/userProfileScreen/UserProfileScreen';
import UserHomeStackScreenNavigator from './UserHomeStackScreenNavigator';

const Tab = createBottomTabNavigator();

function UserTabNavigator() {
  const renderIcon = (focused, color, route, size) => {
    let iconName;
    if (route.name === 'Početna') {
      iconName = focused ? 'ios-home' : 'ios-home-outline';
    } else if (route.name === 'Rezervacije') {
      iconName = focused ? 'bookmark' : 'bookmark-outline';
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
      <Tab.Screen name="Početna" component={UserHomeStackScreenNavigator} />
      <Tab.Screen name="Rezervacije" component={UserBookingHistoryScreen} />
      <Tab.Screen name="Račun" component={UserProfileScreen} />
    </Tab.Navigator>
  );
}

export default UserTabNavigator;
