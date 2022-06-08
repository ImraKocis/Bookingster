import {View, Text} from 'react-native';
import React from 'react';
import {userBookingHistoryStyles} from './Styles/userBookingHistoryStyles';
import TopHeader from './components/TopHeader';
import LongCard from '../userHomeScreen/components/LongCard';
const styles = userBookingHistoryStyles;

const UserBookingHistoryScreen = ({buttonText, headerText}) => {
  return (
    <View style={styles.screenContainer}>
      <TopHeader headerText={headerText} />
      <LongCard buttonText={buttonText} />
      <LongCard buttonText={buttonText} />
    </View>
  );
};

export default UserBookingHistoryScreen;
