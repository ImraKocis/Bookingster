import { StyleSheet } from 'react-native';
import { primary } from '../../../../assets/getColors';

const userBookingHistoryStyles = StyleSheet.create({
  topHeader__View: {
    flex: 1,
    flexDirection: 'row',
    minHeight: 60,
    maxHeight: 60,
    backgroundColor: primary,
    borderBottomEndRadius: 15,
    borderBottomStartRadius: 15,
    alignItems: 'center',
    marginBottom: 0,
  },
  topNavHeader__View: {
    flex: 1,
    flexDirection: 'row',
    minHeight: 60,
    maxHeight: 60,
    backgroundColor: primary,
    alignItems: 'center',
  },
  screenContainer: {
    flex: 1,
  },
});

export default userBookingHistoryStyles;
