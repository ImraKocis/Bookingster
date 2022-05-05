import React from 'react';
import {
  Image,
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  View,
  TouchableOpacity,
  KeyboardAvoidingView,
} from 'react-native';
import Login from './components/login/Login';
const App = () => {
  return <Login />;
};

const styles = StyleSheet.create({
  container: {flex: 1},
  mainView: {flex: 1, backgroundColor: '#dfdfdf'},
  paperView: {
    flex: 1,
    backgroundColor: 'white',
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
    elevation: 10,
    shadowRadius: 5,
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
    marginLeft: 32,
    marginTop: 20,
  },
  header: {fontSize: 40, color: 'black'},
  formView: {
    zIndex: 3,
    flex: 0.6,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'flex-start',
    marginTop: 15,
    marginBottom: 30,
    marginHorizontal: 10,
  },
  email: {
    width: '70%',
    padding: 10,
  },
  password: {
    width: '70%',
    padding: 10,
  },
  buttonVeiw: {
    flex: 0.2,
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 10,
  },
  button: {
    backgroundColor: '#EA5252',
    width: 215,
    height: 45,
    borderRadius: 10,
    justifyContent: 'center',
  },
  buttonText: {
    color: 'white',
    fontSize: 20,
    fontWeight: 'bold',
    alignSelf: 'center',
  },
  signWithView: {
    padding: 5,
    flexDirection: 'row',
    justifyContent: 'center',
    marginVertical: 10,
  },
  signWithText: {color: '#949292', fontSize: 16, alignSelf: 'center'},
  goolgeButtonView: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 10,
  },
  googleButton: {justifyContent: 'center'},
  googleImage: {width: 40, height: 40},
  footerView: {
    flex: 0.15,
    bottom: 0,
    flexDirection: 'column',
    justifyContent: 'flex-end',
  },
  footerText: {color: '#949292', alignSelf: 'center'},
});

export default App;
