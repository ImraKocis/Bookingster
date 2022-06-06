import React, {useState, useEffect} from 'react';
import auth from '@react-native-firebase/auth';
import {NavigationContainer} from '@react-navigation/native';
import WelcomeScreenNavigator from './WelcomeScreenNavigator';
import LogedInNavigator from './LogedInNavigator';
import {useSelector, useDispatch} from 'react-redux';
import {selectUser, login, logout} from '../redux/features/userSlice';

const MainNavigator = () => {
  const user = useSelector(selectUser);
  const dispatch = useDispatch();
  const [initializing, setInitializing] = useState(true);
  const onAuthStateChanged = user_firebase => {
    if (user_firebase) {
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
      {/* {user && console.log('USER NAVIGATOR', user)}
      {user && user ? (
        <LogedInNavigator />
      ) : (
        <WelcomeScreenNavigator
          onAuthStateChanged={onAuthStateChanged}
          initializing={initializing}
        />
      )} */}
      <LogedInNavigator />
    </NavigationContainer>
  );
};

export default MainNavigator;
