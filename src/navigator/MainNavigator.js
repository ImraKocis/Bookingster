import React, {useState, useEffect} from 'react';
import auth from '@react-native-firebase/auth';
import {NavigationContainer} from '@react-navigation/native';
import WelcomeScreenNavigator from './WelcomeScreenNavigator';
import LoggedInNavigator from './LogedInNavigator';
import {useSelector, useDispatch} from 'react-redux';
import {selectUser, login, logout} from '../redux/features/userSlice';
import EstablishmentRegistrationNavigator from './EstablishmentRegistrationNavigator';

const MainNavigator = () => {
  const user = useSelector(selectUser);
  const dispatch = useDispatch();
  const [initializing, setInitializing] = useState(true);
  const onAuthStateChanged = user_firebase => {
    if (user_firebase) {
      auth()
        .currentUser.getIdToken(/* forceRefresh */ true)
        .then(function (idToken) {
          console.log('idToken =>', idToken);
          // dispatch(updateUserInfo({jwt: idToken}));
        })
        .catch(function (error) {
          console.log('JWT_ERROR =>', error);
        });
      dispatch(
        login({
          email: user_firebase.email,
          uid: user_firebase.uid,
          displayName: user_firebase.displayName,
          photoUrl: user_firebase.photoURL,
        }),
      );
    } else {
      dispatch(logout());
    }

    if (initializing) setInitializing(false);
  };
  useEffect(() => {
    const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
    return subscriber; // unsubscribe on unmount
  }, [initializing]);

  return (
    <NavigationContainer>
      <EstablishmentRegistrationNavigator />
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
      {/* <WelcomeScreenNavigator onAuthStateChanged={onAuthStateChanged} /> */}
    </NavigationContainer>
  );
};

export default MainNavigator;
