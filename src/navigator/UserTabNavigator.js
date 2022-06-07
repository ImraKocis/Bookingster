import {View, Text} from 'react-native';
import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Icons from 'react-native-vector-icons/Ionicons';
import {selectUser} from '../redux/features/userSlice';
import {useSelector} from 'react-redux';
import UserHomeScreen from '../components/user/userHomeScreen/UserHomeScreen';
import {neutral, primary} from '../assets/getColors';

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
          if (route.name === 'Home') {
            iconName = focused ? 'ios-home' : 'ios-home-outline';
          } else if (route.name === 'BookingHistory') {
            iconName = focused ? 'bookmark' : 'bookmark-outline';
          } else if (route.name === 'Profile') {
            iconName = focused ? 'person' : 'person-outline';
          }
          return <Icons name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: primary,
        tabBarInactiveTintColor: 'black',
      })}>
      <Tab.Screen name="Home">
        {props => <UserHomeScreen {...props} buttonText={'Rezerviraj'} />}
      </Tab.Screen>

      <Tab.Screen name="BookingHistory">
        {props => <UserHomeScreen {...props} buttonText={'Provjeri'} />}
      </Tab.Screen>
      <Tab.Screen name="Profile">
        {props => <UserHomeScreen {...props} buttonText={'Pero'} />}
      </Tab.Screen>
    </Tab.Navigator>
  );
};

export default UserTabNavigator;
