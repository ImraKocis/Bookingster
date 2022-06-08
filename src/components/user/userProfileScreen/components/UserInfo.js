import {View, Text} from 'react-native';
import React from 'react';
import {userProfileStyles} from '../styles/userProfileStyles';
import {Heading} from 'native-base';
const styles = userProfileStyles;
const UserInfo = () => {
  return (
    <View style={styles.userInfo__mainView}>
      <Heading size={'xl'} fontWeight={400}>
        Osobni podaci
      </Heading>
    </View>
  );
};

export default UserInfo;
