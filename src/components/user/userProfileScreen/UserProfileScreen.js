import {View, Text} from 'react-native';
import React from 'react';
import TopHeader from '../userBookingHistoryScreen/components/TopHeader';
import {userProfileStyles} from './styles/userProfileStyles';
import UserInfo from './components/UserInfo';
import UserDetails from './components/UserDetails';
const styles = userProfileStyles;

const UserProfileScreen = ({headerText}) => {
  return (
    <View style={styles.mainView}>
      <TopHeader headerText={headerText} />
      <UserInfo />
      <UserDetails />
    </View>
  );
};

export default UserProfileScreen;
