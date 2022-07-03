import { View, Platform, Keyboard, Alert } from 'react-native';
import React, { useState, useRef, useEffect } from 'react';
import PagerView from 'react-native-pager-view';
import { Box, KeyboardAvoidingView } from 'native-base';
import { useSelector, useDispatch } from 'react-redux';
import axios from 'axios';
import { ADMIN_TOKEN } from 'react-native-dotenv';
import { backgroundColor } from '../../assets/getColors';
import CustomStepIndicator from './stepIndicator/CustomStepIndicator';
import Hint from './hint/Hint';
import OsnovniPodaci from './osnovniPodaci/OsnovniPodaci';
import RadnoVrijeme from './radnoVrijeme/RadnoVrijeme';
import DodajSliku from './dodajSliku/DodajSliku';
import Stolovi from './stolovi/Stolovi';
import { selectUser } from '../../redux/features/userSlice';
// import {
//   selectForm,
//   updateFormState,
//   setOsnovniPodaci,
//   setRadnoVrijeme,
//   setSlika,
//   setStolovi,
// } from '../../redux/features/registrationFormSlice';

function EstablishmentRegistrationForm() {
  // const formState = useSelector(selectForm);
  const user = useSelector(selectUser);
  // const dispatch = useDispatch();
  const ref = useRef(PagerView);

  const [currentPosition, setCurrentPosition] = useState(0);

  const [screenTwo, setScreenTwo] = useState({}); // lokacija i osnovni podaci objekt
  const [screenThree, setScreenThree] = useState([]); // radno vrijeme arr objekata
  const [screenFour, setScreenFour] = useState([]); // slika arr objekata
  const [screenFive, setScreenFive] = useState([]); // stolovi nije definirano

  const [error, setError] = useState(null);
  const [clicked, setClicked] = useState(false);
  const handleLeftArrowPress = () => {
    ref.current.setPage(currentPosition - 1);
  };
  const handleRightArrowPress = () => {
    ref.current.setPage(currentPosition + 1);
  };

  const postEstablishment = async (apiObj) => {
    const res = await axios
      .post('https://bookingsterapi.oa.r.appspot.com/bookingster/api/establishment', apiObj, {
        headers: { authorization: `Bearer ${ADMIN_TOKEN}` },
      })
      .then((response) => response.data.establishment)
      .catch((err) => {
        setError(err.response.data.errorMessage);
        Alert.alert('Upozorenje', err.response.data.errorMessage, [
          { text: 'OK', onPress: () => console.log('OK Pressed') },
        ]);
      });
    // return res.data.establishment;

    return res;
  };

  // const loadData = async () => {
  //   const apiResponse = await postEstablishment();
  //   console.log('api response==>', apiResponse.data);
  //   setApiData(apiResponse.data.establishments);
  // };

  const setFormState = async () => {
    const apiObject = {
      owner: user.UID,
      ...screenTwo,
      workingHours: screenThree,
      images: screenFour,
      tables: screenFive,
    };

    console.log('Api Post Response==>', await postEstablishment(apiObject));

    console.log(apiObject);
  };

  // const renderAlert = () =>
  //   Alert.alert('Upozorenje', error, [{ text: 'OK', onPress: () => console.log('OK Pressed') }]);

  useEffect(() => {
    const showSubscription = Keyboard.addListener('keyboardDidShow', () => {
      setClicked(true);
    });
    const hideSubscription = Keyboard.addListener('keyboardDidHide', () => {
      setClicked(false);
    });

    return () => {
      showSubscription.remove();
      hideSubscription.remove();
    };
  }, []);
  return (
    <Box flex={1} backgroundColor={backgroundColor}>
      <Box display={clicked ? 'none' : 'flex'} flex={0.2} marginTop={5} justifyContent="center">
        <CustomStepIndicator PagerView={ref} currentPosition={currentPosition} />
      </Box>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        keyboardVerticalOffset={Platform.OS === 'ios' ? 0 : 20}
        enabled={Platform.OS === 'ios'}
        flexGrow={1}
      >
        <PagerView
          ref={ref}
          onPageSelected={(e) => {
            setCurrentPosition(e.nativeEvent.position);
            // console.log(e.nativeEvent);
            // setFormState(e.nativeEvent.position - 1);
          }}
          style={{
            flexGrow: 1,
          }}
          initialPage={0}
        >
          <View key="1">
            <Hint handleRightArrowPress={handleRightArrowPress} currentPosition={currentPosition} />
          </View>
          <View key="2">
            <OsnovniPodaci
              handleRightArrowPress={handleRightArrowPress}
              handleLeftArrowPress={handleLeftArrowPress}
              setScreenTwo={setScreenTwo}
            />
          </View>
          <View key="3">
            <RadnoVrijeme
              handleRightArrowPress={handleRightArrowPress}
              handleLeftArrowPress={handleLeftArrowPress}
              setScreenThree={setScreenThree}
            />
          </View>
          <View key="4">
            <DodajSliku
              handleRightArrowPress={handleRightArrowPress}
              handleLeftArrowPress={handleLeftArrowPress}
              setScreenFour={setScreenFour}
            />
          </View>
          <View key="5">
            <Stolovi
              handleRightArrowPress={handleRightArrowPress}
              handleLeftArrowPress={handleLeftArrowPress}
              setScreenFive={setScreenFive}
              screenFive={screenFive}
              setFormState={setFormState}
              error={error}
            />
          </View>
        </PagerView>
      </KeyboardAvoidingView>
    </Box>
  );
}

export default EstablishmentRegistrationForm;
