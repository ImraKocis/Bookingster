import {View, Text} from 'react-native';
import React from 'react';
import {userBookingHistoryStyles} from '../Styles/userBookingHistoryStyles';
import {Center, Heading} from 'native-base';
const styles = userBookingHistoryStyles;
const TopHeader = ({headerText}) => {
  return (
    <View style={styles.topHeader__View}>
      <Center flex={1}>
        <Heading fontWeight={400} color={'white'} size={'xl'}>
          {headerText}
        </Heading>
      </Center>
    </View>
  );
};

export default TopHeader;
