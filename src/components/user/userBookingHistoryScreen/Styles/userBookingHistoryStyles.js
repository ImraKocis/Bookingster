import { StyleSheet } from 'react-native';
import { primary } from '../../../../assets/getColors';

const userBookingHistoryStyles = StyleSheet.create({
  topHeader__View: {
    flex: 1,
    flexDirection: 'row',
    maxHeight: 70,
    backgroundColor: primary,
    borderBottomEndRadius: 15,
    borderBottomStartRadius: 15,
    alignItems: 'center',
    marginBottom: 40,
  },
  screenContainer: {
    flex: 1,
  },
});

export default userBookingHistoryStyles;
