import React, { useState, useEffect, useMemo } from 'react';
import auth from '@react-native-firebase/auth';
import { useSelector, useDispatch } from 'react-redux';
import { selectUser, login, updateUserInfo } from '../redux/features/userSlice';
import UserTabNavigator from './UserTabNavigator';
import EstablishmentOwnerTabNavigator from './EstablishmentOwnerTabNavigator';
import ChoiceScreenNavigator from './ChoiceScreenNavigator';
import WelcomeScreenNavigator from './WelcomeScreenNavigator';
import AppContext from './AppContext';
import userGet from '../api/userGet';
import EstablishmentRegistrationForm from '../components/ugostiteljForm/EstablishmentRegistrationForm';

function MainNavigator() {
  const user = useSelector(selectUser);
  const dispatch = useDispatch();
  const [initializing, setInitializing] = useState(true);
  const [userInfo, setUserInfo] = useState(null);
  const [isNewUser, setIsNewUser] = useState(false);
  const contextValue = useMemo(
    () => ({
      isNewUser,
      setUserInfo,
      setIsNewUser,
    }),
    [isNewUser, setUserInfo, setIsNewUser]
  );

  useEffect(() => {
    const onIdTokenChanged = (userFirebase) => {
      if (!user && userFirebase) {
        userGet({ uid: userFirebase.uid })
          .then((response) => {
            setUserInfo(response.user);
          })
          .catch((error) => {
            console.log(error);
          });
      }
      if (userFirebase) {
        auth()
          .currentUser.getIdToken(true)
          .then((idToken) => {
            updateUserInfo({ jwt: idToken });
          })
          .catch((error) => {
            console.log('Error fetching JWT from firebase =>', error);
          });
      }
      if (initializing) setInitializing(false);
    };
    const subscriber = auth().onIdTokenChanged(onIdTokenChanged);
    return subscriber;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [initializing]);

  useEffect(() => {
    if (userInfo) {
      dispatch(login(userInfo));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userInfo]);

  const renderNavigator = () => {
    if (user) {
      if (user.accountType === null) {
        return <ChoiceScreenNavigator />;
      }
      if (user.accountType === 0) {
        return <UserTabNavigator />;
      }
      if (user.isNewUser && user.accountType === 1) {
        return <EstablishmentRegistrationForm />;
      }
      if (user.accountType === 1) {
        return <EstablishmentOwnerTabNavigator />;
      }
    }
    return <WelcomeScreenNavigator />;
  };

  if (initializing) return null;
  return <AppContext.Provider value={contextValue}>{renderNavigator()}</AppContext.Provider>;
}

export default MainNavigator;
