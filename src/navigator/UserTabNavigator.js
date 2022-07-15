import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Icons from 'react-native-vector-icons/Ionicons';
import { Image, Icon } from 'native-base';
import { useSelector } from 'react-redux';
import UserHomeScreen from '../components/user/userHomeScreen/UserHomeScreen';
import { neutral, primary } from '../assets/getColors';
import UserBookingHistoryScreen from '../components/user/userBookingHistoryScreen/UserBookingHistoryScreen';
import UserProfileScreen from '../components/user/userProfileScreen/UserProfileScreen';
import UserHomeStackScreenNavigator from './UserHomeStackScreenNavigator';
import UserReservationsTopTabNavigator from './UserReservationsTopTabNavigator';
import { selectUser } from '../redux/features/userSlice';

const Tab = createBottomTabNavigator();

function UserTabNavigator() {
  const user = useSelector(selectUser);

  const renderIcon = (focused, color, route, size) => {
    let iconName;
    if (route.name === 'Početna') {
      iconName = focused ? 'ios-home' : 'ios-home-outline';
    } else if (route.name === 'Rezervacije') {
      iconName = focused ? 'bookmark' : 'bookmark-outline';
    } else if (route.name === 'Račun') {
      return (
        <Image
          w={7}
          h={7}
          alt="UserProfileImage"
          borderRadius={30}
          borderWidth={2}
          borderColor={focused ? primary : neutral}
          source={{ uri: user.photoURL }}
        />
      );
      // iconName = focused ? 'person' : 'person-outline';
    }
    return <Icon as={Icons} name={iconName} size={size} color={color} />;
  };

  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarStyle: { elevation: 6 },
        tabBarHideOnKeyboard: true,
        tabBarIcon: ({ focused, color, size }) => renderIcon(focused, color, route, size),
        tabBarActiveTintColor: primary,
        tabBarInactiveTintColor: 'black',
      })}
    >
      <Tab.Screen name="Početna" component={UserHomeStackScreenNavigator} />
      <Tab.Screen name="Rezervacije" component={UserReservationsTopTabNavigator} />
      <Tab.Screen name="Račun" component={UserProfileScreen} />
    </Tab.Navigator>
  );
}

export default UserTabNavigator;
