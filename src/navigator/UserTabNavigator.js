import {View, Text} from 'react-native';
import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Icons from 'react-native-vector-icons/Ionicons';
import {selectUser} from '../redux/features/userSlice';
import {useSelector} from 'react-redux';
import UserHomeScreen from '../components/user/userHomeScreen/UserHomeScreen';
import TopHeader from '../components/user/userBookingHistoryScreen/components/TopHeader';
import {neutral, primary} from '../assets/getColors';
import UserBookingHistoryScreen from '../components/user/userBookingHistoryScreen/UserBookingHistoryScreen';
import UserProfileScreen from '../components/user/userProfileScreen/UserProfileScreen';

const Tab = createBottomTabNavigator();

const UserTabNavigator = () => {
  //const user = useSelector(selectUser);
  return (
    <Tab.Navigator
      screenOptions={({route}) => ({
        headerShown: false,
        tabBarHideOnKeyboard: true,
        tabBarIcon: ({focused, color, size}) => {
          let iconName;
          if (route.name === 'Početna') {
            iconName = focused ? 'ios-home' : 'ios-home-outline';
          } else if (route.name === 'Rezervacije') {
            iconName = focused ? 'bookmark' : 'bookmark-outline';
          } else if (route.name === 'Račun') {
            iconName = focused ? 'person' : 'person-outline';
          }
          return <Icons name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: primary,
        tabBarInactiveTintColor: 'black',
      })}>
      <Tab.Screen name="Početna">
        {props => <UserHomeScreen {...props} buttonText={'Rezerviraj'} />}
      </Tab.Screen>

      <Tab.Screen name="Rezervacije">
        {props => (
          <UserBookingHistoryScreen
            {...props}
            headerText={'Vaše rezervacije'}
            buttonText={'Provjeri'}
          />
        )}
      </Tab.Screen>
      <Tab.Screen name="Račun">
        {props => (
          <UserProfileScreen
            {...props}
            headerText={'Bookingster'}
            buttonText={'Pero'}
          />
        )}
      </Tab.Screen>
    </Tab.Navigator>
  );
};

export default UserTabNavigator;
