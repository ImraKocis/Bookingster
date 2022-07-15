import React, { useState, useEffect, useMemo } from 'react';
import auth from '@react-native-firebase/auth';
import { useSelector, useDispatch } from 'react-redux';
import { ADMIN_TOKEN } from 'react-native-dotenv';
import { selectUser, login, updateUserInfo } from '../redux/features/userSlice';
import UserTabNavigator from './UserTabNavigator';
import EstablishmentOwnerTabNavigator from './EstablishmentOwnerTabNavigator';
import ChoiceScreenNavigator from './ChoiceScreenNavigator';
import WelcomeScreenNavigator from './WelcomeScreenNavigator';
import AppContext from './AppContext';
import userGet from '../api/userGet';
import EstablishmentRegistrationForm from '../components/ugostiteljForm/EstablishmentRegistrationForm';
import { patchData, getDataWithQueryParams } from '../api/axiosRequests';
import { userUrl } from '../utils/apiUrls';
// import axios from 'axios';
// import { Text } from 'native-base';
const adm = ADMIN_TOKEN;
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
    // patchData('a', { parm1: 'dsads', asdasd: 'sds' }, 's');
    // console.log('initializing useEffect');
    const onIdTokenChanged = (userFirebase) => {
      if (!user && userFirebase) {
        // const userRes = getDataWithQueryParams(userUrl, { UID: userFirebase.uid }, adm);
        // console.log('userResMainNav==>', userRes.read());
        userGet({ uid: userFirebase.uid })
          .then((response) => {
            // console.log('Response data u main useEffect', response.data.user);
            setUserInfo(response.data.user);
          })
          .catch((error) => {
            console.log(error);
          });
      }
      if (userFirebase) {
        auth()
          .currentUser.getIdToken(true)
          .then((idToken) => {
            // console.log('idToken==>', idToken);
            dispatch(updateUserInfo({ jwt: idToken }));
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
      // console.log('userinfo useEffect');
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userInfo]);

  // eslint-disable-next-line consistent-return
  const renderNavigator = () => {
    if (user) {
      // console.log('USER in IF===>', user);
      if (user.accountType === null) {
        // console.log('accountType null');
        return <ChoiceScreenNavigator />;
      }
      if (user.accountType === 0) {
        // console.log('accountType 0');
        return <UserTabNavigator />;
      }
      if (user.isNewUser && user.accountType === 1) {
        // console.log('accountType 1 && newAcc');
        return <EstablishmentRegistrationForm />;
      }
      if (user.accountType === 1) {
        // console.log('accountType 1');
        return <EstablishmentOwnerTabNavigator />;
      }
    } else return <WelcomeScreenNavigator />;
  };

  if (initializing) return null;
  return <AppContext.Provider value={contextValue}>{renderNavigator()}</AppContext.Provider>;
}

export default MainNavigator;
