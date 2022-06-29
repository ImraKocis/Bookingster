import { View, Platform } from 'react-native';
import React, { useState, useRef, useEffect } from 'react';
import PagerView from 'react-native-pager-view';
import { Box, KeyboardAvoidingView } from 'native-base';
import { useSelector, useDispatch } from 'react-redux';
import { backgroundColor } from '../../assets/getColors';
import CustomStepIndicator from './stepIndicator/CustomStepIndicator';
import Hint from './hint/Hint';
import OsnovniPodaci from './osnovniPodaci/OsnovniPodaci';
import RadnoVrijeme from './radnoVrijeme/RadnoVrijeme';
import DodajSliku from './dodajSliku/DodajSliku';
import Stolovi from './stolovi/Stolovi';
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
  const dispatch = useDispatch();
  const ref = useRef(PagerView);

  const [currentPosition, setCurrentPosition] = useState(0);

  const [screenTwo, setScreenTwo] = useState({}); // lokacija i osnovni podaci objekt
  const [screenThree, setScreenThree] = useState([]); // radno vrijeme arr objekata
  const [screenFour, setScreenFour] = useState({}); // slika arr objekata
  const [screenFive, setScreenFive] = useState([]); // stolovi nije definirano

  const [isValid, setIsValid] = useState(false);

  const handleLeftArrowPress = () => {
    ref.current.setPage(currentPosition - 1);
  };
  const handleRightArrowPress = () => {
    ref.current.setPage(currentPosition + 1);
  };

  const setFormState = () => {
    const apiObject = {
      ...screenTwo,
      workingHours: screenThree,
      images: screenFour,
      tables: screenFive,
    };

    console.log(apiObject);
  };
  // useEffect(() => {
  //   // console.log(screenThree);
  //   dispatch(setOsnovniPodaci(screenTwo));
  //   dispatch(setRadnoVrijeme(screenThree));
  //   // if(currentPosition == 3)dispatch(updateFormState(screenFour))
  //   // if(currentPosition == 4)dispatch(updateFormState(screenFive))
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, [currentPosition]);
  return (
    <Box flex={1} backgroundColor={backgroundColor}>
      <Box flex={0.2} marginTop={5} justifyContent="center">
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
            setFormState(e.nativeEvent.position - 1);
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
            />
          </View>
        </PagerView>
      </KeyboardAvoidingView>
    </Box>
  );
}

export default EstablishmentRegistrationForm;
