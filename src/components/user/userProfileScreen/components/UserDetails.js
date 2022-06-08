import {View, Text} from 'react-native';
import React from 'react';
import {userProfileStyles} from '../styles/userProfileStyles';
const styles = userProfileStyles;

const UserDetails = () => {
  return (
    <View style={styles.userDetails__mainView}>
      <Text>UserDetails</Text>
    </View>
  );
};

export default UserDetails;
