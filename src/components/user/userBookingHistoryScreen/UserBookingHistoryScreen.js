import { View } from 'react-native';
import React from 'react';
import userBookingHistoryStyles from './Styles/userBookingHistoryStyles';
import TopHeader from './components/TopHeader';
import LongCard from '../userHomeScreen/components/LongCard';

const styles = userBookingHistoryStyles;

function UserBookingHistoryScreen() {
  return (
    <View style={styles.screenContainer}>
      <TopHeader headerText="Vaše rezervacije" />
      {/* <LongCard buttonText="Provjeri" />
      <LongCard buttonText="Provjeri" /> */}
    </View>
  );
}

export default UserBookingHistoryScreen;
