import {View, Text, TouchableOpacity} from 'react-native';
import React from 'react';
import {userProfileStyles} from '../styles/userProfileStyles';

const styles = userProfileStyles;

const SignOutButton = () => {
  return (
    <TouchableOpacity style={styles.SignOutButton}>
      <Text style={styles.SignOutButton__text}>Odjava</Text>
    </TouchableOpacity>
  );
};

export default SignOutButton;
