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
import {NativeBaseProvider} from 'native-base';
import Login from './components/login/Login';
import SignUp from './components/signup/SignUp';
import SignUpTest from './components/signup/SignUpTest';
const App = () => {
  return (
    <NativeBaseProvider>
      <SignUpTest />
    </NativeBaseProvider>
  );
};

export default App;
