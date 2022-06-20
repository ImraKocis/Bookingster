import React, {useState, useEffect, useRef} from 'react';
import auth from '@react-native-firebase/auth';
import {NavigationContainer} from '@react-navigation/native';

import LoggedInNavigator from './LogedInNavigator';
import {useSelector, useDispatch} from 'react-redux';
import {
  selectUser,
  login,
  logout,
  updateUserInfo,
} from '../redux/features/userSlice';
import EstablishmentRegistrationNavigator from './EstablishmentRegistrationNavigator';
import UserTabNavigator from './UserTabNavigator';
import EstablishmentOwnerTabNavigator from './EstablishmentOwnerTabNavigator';
import ChoiceScreenNavigator from './ChoiceScreenNavigator';
import WelcomeScreenNavigator from './WelcomeScreenNavigator';
import userGet from '../api/userGet';
import {Center, NativeBaseProvider, Spinner} from 'native-base';
import {primary} from '../assets/getColors';

const MainNavigator = () => {
  const user = useSelector(selectUser);
  const dispatch = useDispatch();
  const [initializing, setInitializing] = useState(true);
  const [userInfo, setUserInfo] = useState(null);
  const [isNewUser, setIsNewUser] = useState(false);
  const [isLoggingIn, setIsLoggingIn] = useState(false);

  const onAuthStateChanged = user_firebase => {
    console.log('User signed in: ', user_firebase);
    if (!user && user_firebase) {
      console.log('if main nav get: ', user_firebase.uid);
      userGet({uid: user_firebase.uid})
        .then(response => {
          setUserInfo(response.user);
        })
        .catch(error => {
          console.log(error);
        });
    }
    if (user_firebase) {
      auth()
        .currentUser.getIdToken(/* forceRefresh */ false)
        .then(function (idToken) {
          console.log('USER MAIN =>', user);

          updateUserInfo({jwt: idToken});
        })
        .catch(function (error) {
          console.log('JWT ERROR =>', error);
        });
    }

    if (initializing) setInitializing(false);
  };
  useEffect(() => {
    const subscriber = auth().onAuthStateChanged(onAuthStateChanged);

    return subscriber; // unsubscribe on unmount
  }, [initializing]);
  useEffect(() => {
    if (userInfo) {
      dispatch(login(userInfo));
    }
  }, [userInfo]);

  if (initializing) return null;
  return (
    <NavigationContainer>
      <NativeBaseProvider>
        {user ? (
          (console.log('user navigator', user),
          user.accountType == null ? (
            <ChoiceScreenNavigator
              setUserInfo={setUserInfo}
              setIsLoggingIn={setIsLoggingIn}
              isNewUser={isNewUser}
            />
          ) : user.accountType == 0 ? (
            <UserTabNavigator />
          ) : user.isNewUser ? (
            <EstablishmentRegistrationNavigator />
          ) : (
            <EstablishmentOwnerTabNavigator />
          ))
        ) : (
          <WelcomeScreenNavigator
            setIsNewUser={setIsNewUser}
            setUserInfo={setUserInfo}
            setIsLoggingIn={setIsLoggingIn}
          />
        )}
      </NativeBaseProvider>

      {/* <EstablishmentRegistrationNavigator /> */}
      {/* {user && console.log('USER NAVIGATOR', user)}
      {user && user ? (
        <LoggedInNavigator />
      ) : (
        <WelcomeScreenNavigator
          onAuthStateChanged={onAuthStateChanged}
          initializing={initializing}
        />
      )} */}
      {/* <LoggedInNavigator /> */}
    </NavigationContainer>
  );
};

export default MainNavigator;
