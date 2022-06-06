import {View, Text} from 'react-native';
import React from 'react';
import {selectUser} from '../redux/features/userSlice';
import {useSelector} from 'react-redux';
import UserHomeScreen from '../components/user/userHomeScreen/UserHomeScreen';
const UserTabNavigator = () => {
  const user = useSelector(selectUser);
  return <UserHomeScreen />;
};

export default UserTabNavigator;
