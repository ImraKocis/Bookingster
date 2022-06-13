import React, {useState, useEffect} from 'react';
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

const MainNavigator = () => {
  const user = useSelector(selectUser);
  const dispatch = useDispatch();
  const [initializing, setInitializing] = useState(true);
  const [userInfo, setUserInfo] = useState(null);
  const [isNewUser, setIsNewUser] = useState(false);
  const onAuthStateChanged = user_firebase => {
    if (user_firebase) {
      //console.log('User signed in: ', user_firebase);
      auth()
        .currentUser.getIdToken(/* forceRefresh */ true)
        .then(function (idToken) {
          //console.log('idToken =>', idToken);
          dispatch(updateUserInfo({jwt: idToken}));
        })
        .catch(function (error) {
          console.log('JWT_ERROR =>', error);
        });
      // if (!userInfo) {
      //   dispatch(
      //     login({
      //       email: user_firebase.email,
      //       uid: user_firebase.uid,
      //       displayName: user_firebase.displayName,
      //       photoUrl: user_firebase.photoURL,
      //     }),
      //   );
      // }
    } else {
      //console.log('User signed out');
      dispatch(logout());
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
  return (
    <NavigationContainer>
      <>
        {user ? (
          (console.log('user =>', user),
          !user.accountType ? (
            <ChoiceScreenNavigator
              onAuthStateChanged={onAuthStateChanged}
              initializing={initializing}
              setUserInfo={setUserInfo}
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
            onAuthStateChanged={onAuthStateChanged}
            initializing={initializing}
          />
        )}
      </>
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
