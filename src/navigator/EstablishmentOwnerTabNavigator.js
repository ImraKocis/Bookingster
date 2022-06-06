import {View, Text, TouchableOpacity} from 'react-native';

import React from 'react';
import auth from '@react-native-firebase/auth';
import {loginStyle} from '../components/login/loginStyle';
const styles = loginStyle;
const EstablishmentOwnerTabNavigator = () => {
  const LogoutUser = () => {
    auth().signOut();
  };
  return (
    <View>
      <Text>EstablishmentOwnerTabNavigator</Text>
      <View
        style={{
          flex: 1,
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
        }}>
        <Text style={{textAlign: 'center', marginBottom: 15}}>user</Text>
        <TouchableOpacity onPress={LogoutUser} style={styles.button}>
          <Text style={styles.buttonText}>Odjava</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default EstablishmentOwnerTabNavigator;
