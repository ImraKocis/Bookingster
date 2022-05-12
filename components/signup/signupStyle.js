import react from 'react';
import {StyleSheet} from 'react-native';
import {primary} from '../../assets/getColors';

export const signupStyle = StyleSheet.create({
  container: {flex: 1},
  mainView: {flex: 1, backgroundColor: '#dfdfdf'},
  paperView: {
    flex: 1,
    backgroundColor: 'white',
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
    elevation: 10,
  },
  imageContainer: {
    flex: 0.5,
  },
  imageVeiw: {
    position: 'absolute',
    top: 10,
    bottom: 10,
    right: 35,
    left: 35,
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
  image: {
    flex: 1,
    resizeMode: 'contain',
    width: 310,
    height: 250,
    borderRadius: 10,
  },
  headerView: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginLeft: '10%',
    marginTop: 10,
  },
  header: {fontSize: 35, color: 'black'},
  formView: {
    zIndex: 3,
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'flex-start',
    marginTop: 5,
    marginBottom: 30,
    marginHorizontal: 10,
  },
  formImePrezime: {
    flexDirection: 'row',
    width: '70%',
    justifyContent: 'space-between',
    height: 40,
    marginBottom: 10,
  },
  ime: {
    width: '45%',
    backgroundColor: 'white',
    justifyContent: 'center',
  },
  prezime: {
    width: '45%',
    backgroundColor: 'white',
    fontSize: 15,
    justifyContent: 'center',
  },
  email: {
    fontSize: 15,
    width: '70%',
    backgroundColor: 'white',
    height: 40,
    marginBottom: 10,
  },
  password: {
    fontSize: 15,
    height: 40,
    width: '70%',
    backgroundColor: 'white',
    marginBottom: 10,
  },
  buttonVeiw: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 7,
  },
  button: {
    backgroundColor: primary,
    width: 195,
    height: 45,
    borderRadius: 10,
    justifyContent: 'center',
  },
  buttonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
    alignSelf: 'center',
  },
  errorText: {marginTop: 7},
  signWithView: {
    padding: 5,
    flexDirection: 'row',
    justifyContent: 'center',
    marginVertical: 2,
  },
  signWithText: {color: '#949292', fontSize: 16, alignSelf: 'center'},
  goolgeButtonView: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 5,
  },
  googleButton: {justifyContent: 'center'},
  googleImage: {width: 40, height: 40},
  footerView: {
    padding: 10,
    flex: 0.15,
    bottom: 0,
    flexDirection: 'column',
    justifyContent: 'flex-end',
  },
  footerText: {color: '#949292', alignSelf: 'center'},
});
