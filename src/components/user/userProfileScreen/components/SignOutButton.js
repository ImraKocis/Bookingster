import { Text, TouchableOpacity } from 'react-native';
import React from 'react';
import auth from '@react-native-firebase/auth';
import { useDispatch } from 'react-redux';
import userProfileStyles from '../styles/userProfileStyles';
import { logout } from '../../../../redux/features/userSlice';

const styles = userProfileStyles;

function SignOutButton() {
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
}

export default SignOutButton;
