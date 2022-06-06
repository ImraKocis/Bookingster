import EstablishmentOwnerNavigator from './EstablishmentOwnerTabNavigator';
import UserTabNavigator from './UserTabNavigator';
import {selectUser} from '../redux/features/userSlice';
import {View, Text} from 'react-native';
import React from 'react';
import {useSelector} from 'react-redux';

//tab navigator koji ce gledata dali je logan korisnik ili ugostitelj
const LogedInNavigator = () => {
  const user = useSelector(selectUser);

  return (
    <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
      {/* {console.log(user.accountType)}
      {user.accountType == 0 ? (
        <UserTabNavigator />
      ) : (
        <EstablishmentOwnerNavigator />
      )} */}
      <UserTabNavigator />
    </View>
  );
};

export default LogedInNavigator;
