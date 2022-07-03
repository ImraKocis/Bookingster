import { Keyboard, Platform, TouchableWithoutFeedback, View } from 'react-native';
import React, { useState } from 'react';
import { KeyboardAvoidingView, StatusBar } from 'native-base';
import TopHeader from '../userBookingHistoryScreen/components/TopHeader';
import userProfileStyles from './styles/userProfileStyles';
import UserInfo from './components/UserInfo';
import UserDetails from './components/UserDetails';
import SignOutButton from './components/SignOutButton';
import KeyboardAvoidingViewWrapper from '../../keyboardAvoidingViewWrapper/KeyboardAvoidingViewWrapper';
import { primary } from '../../../assets/getColors';

const styles = userProfileStyles;

function UserProfileScreen() {
  const [clicked, setClicked] = useState(false);

  const handleKeyboard = () => {
    setClicked(false);
    Keyboard.dismiss();
  };
  return (
    <KeyboardAvoidingViewWrapper>
      <View style={styles.mainView}>
        <TopHeader headerText="Bookingster" />
        <UserInfo />

        <UserDetails />

        <SignOutButton />
      </View>
    </KeyboardAvoidingViewWrapper>
  );
}

export default UserProfileScreen;
