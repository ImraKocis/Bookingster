import {View, Text, TouchableOpacity} from 'react-native';
import React from 'react';
import {userProfileStyles} from '../styles/userProfileStyles';
import auth from '@react-native-firebase/auth';
import {logout} from '../../../../redux/features/userSlice';
import {useDispatch} from 'react-redux';
const styles = userProfileStyles;

const SignOutButton = () => {
  const dispatch = useDispatch();
  const LogoutUser = () => {
    dispatch(logout());
    auth().signOut();
  };
  return (
    <TouchableOpacity onPress={LogoutUser} style={styles.SignOutButton}>
      <Text style={styles.SignOutButton__text}>Odjava</Text>
    </TouchableOpacity>
  );
};

export default SignOutButton;
