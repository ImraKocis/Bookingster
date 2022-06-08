import {View, Text} from 'react-native';
import React from 'react';
import TopHeader from '../userBookingHistoryScreen/components/TopHeader';
import {userProfileStyles} from './styles/userProfileStyles';
import UserInfo from './components/UserInfo';
import UserDetails from './components/UserDetails';
import SignOutButton from './components/SignOutButton';
const styles = userProfileStyles;

const UserProfileScreen = ({headerText}) => {
  return (
    <View style={styles.mainView}>
      <TopHeader headerText={headerText} />
      <UserInfo />
      <UserDetails />
      <SignOutButton />
    </View>
  );
};

export default UserProfileScreen;
