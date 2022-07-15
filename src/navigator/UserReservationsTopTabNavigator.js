import { View, Text } from 'react-native';
import React from 'react';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import UserBookingHistoryScreen from '../components/user/userBookingHistoryScreen/UserBookingHistoryScreen';
import UserBookingPendingScreen from '../components/user/userBookingHistoryScreen/UserBookingPendingScreen';
import { primary, secondary } from '../assets/getColors';
import TopHeader from '../components/user/userBookingHistoryScreen/components/TopHeader';
import TopNavHeader from '../components/user/userBookingHistoryScreen/components/TopNavHeader';

const Tab = createMaterialTopTabNavigator();

function UserReservationsTopTabNavigator() {
  return (
    <>
      <TopNavHeader headerText="Rezervacije" />
      <Tab.Navigator
        initialRouteName="Approved"
        screenOptions={{
          tabBarActiveTintColor: 'white',
          tabBarIndicatorStyle: { backgroundColor: secondary, height: 3 },
          tabBarLabelStyle: { fontSize: 14 },
          tabBarStyle: { backgroundColor: primary, borderBottomColor: primary },
        }}
      >
        <Tab.Screen
          name="Approved"
          options={{ tabBarLabel: 'MOJE REZERVACIJE' }}
          component={UserBookingHistoryScreen}
        />
        <Tab.Screen
          name="Pending"
          options={{ tabBarLabel: 'REZERVACIJE U OBRADI' }}
          component={UserBookingPendingScreen}
        />
      </Tab.Navigator>
    </>
  );
}

export default UserReservationsTopTabNavigator;
