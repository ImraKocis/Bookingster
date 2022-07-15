import { View } from 'react-native';
import React from 'react';
import { Center, Heading } from 'native-base';
import PropTypes from 'prop-types';
import userBookingHistoryStyles from '../Styles/userBookingHistoryStyles';

const styles = userBookingHistoryStyles;

function TopNavHeader({ headerText }) {
  return (
    <View style={styles.topNavHeader__View}>
      <Center flex={1}>
        <Heading fontWeight={400} color="white" size="xl">
          {headerText}
        </Heading>
      </Center>
    </View>
  );
}

TopNavHeader.propTypes = {
  headerText: PropTypes.string.isRequired,
};

export default TopNavHeader;
