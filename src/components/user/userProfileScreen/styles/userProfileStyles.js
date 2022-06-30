import { StyleSheet } from 'react-native';
import { primary } from '../../../../assets/getColors';

const userProfileStyles = StyleSheet.create({
  mainView: { flex: 1 },
  userInfo__mainView: {
    flex: 1,
    maxHeight: '22%',
    backgroundColor: 'white',
    elevation: 10,
    borderRadius: 20,
    marginHorizontal: 20,
    marginBottom: '5%',
  },
  userInfo__photoView: {
    flex: 0.4,
    flexDirection: 'row',
    marginTop: 10,
    alignItems: 'flex-start',
    justifyContent: 'center',
  },
  userInfo__photo: { width: 50, height: 50, borderRadius: 50 },
  userInfo__nameView: {
    flex: 0.6,
    justifyContent: 'center',
    alignItems: 'center',
  },
  userInfo__emailView: {},
  userDetails__mainView: {
    flex: 1,
    // maxHeight: '45%',
    backgroundColor: 'white',
    elevation: 10,
    borderRadius: 15,
    marginHorizontal: 20,
  },
  userDetails__photoView: {
    flex: 0.2,
    marginVertical: '5%',
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  userDetails__photo: { width: 75, height: 75, borderRadius: 50 },
  userDetails__formView: {
    // backgroundColor: 'red',
    flex: 0.6,
    marginHorizontal: '5%',
    marginTop: '5%',
  },
  userDetails__formButton: {
    flex: 1,
    marginVertical: '5%',
    marginHorizontal: '15%',
    borderRadius: 10,
    height: '70%',
    minWidth: '35%',
    backgroundColor: primary,
    alignItems: 'center',
    justifyContent: 'center',
  },
  SignOutButton: {
    flex: 1,
    minHeight: '7%',
    marginVertical: '6%',
    marginHorizontal: '30%',
    borderRadius: 10,
    backgroundColor: primary,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  SignOutButton__text: { fontSize: 15, color: 'white', fontWeight: 'bold' },
});

export default userProfileStyles;
