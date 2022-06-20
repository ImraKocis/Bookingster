import {View, Text, TouchableOpacity, Platform} from 'react-native';
import React, {useState, useRef} from 'react';
import {backgroundColor, primary} from '../../assets/getColors';
import PagerView from 'react-native-pager-view';

import CustomStepIndicator from './stepIndicator/CustomStepIndicator';
import {Box, Input, KeyboardAvoidingView} from 'native-base';
import Hint from './hint/Hint';
import OsnovniPodaci from './osnovniPodaci/OsnovniPodaci';
import RadnoVrijeme from './radnoVrijeme/RadnoVrijeme';

const EstablishmentRegistrationForm = () => {
  const [oib, setOib] = useState('');
  const [naziv, setNaziv] = useState('');
  const [adresa, setAdresa] = useState('');
  const [mjesto, setMjesto] = useState('');
  const [drzava, setDrzava] = useState('');

  const ref = useRef(PagerView);
  const [currentPosition, setCurrentPosition] = useState(0);
  // useEffect(() => {
  //   console.log('Hola Amigo'); //save u redux, u ovome ne treba
  // }, [currentPosition]);
  const handleLeftArrowPress = () => {
    ref.current.setPage(currentPosition - 1);
  };
  const handleRightArrowPress = () => {
    ref.current.setPage(currentPosition + 1);
  };
  return (
    <Box flex={1} backgroundColor={backgroundColor}>
      <Box flex={0.2} marginTop={5} justifyContent={'center'}>
        <CustomStepIndicator currentPosition={currentPosition} />
      </Box>
      <KeyboardAvoidingView
        behavior={Platform.OS == 'ios' ? 'padding' : 'height'}
        keyboardVerticalOffset={Platform.OS == 'ios' ? 0 : 20}
        enabled={Platform.OS === 'ios' ? true : false}
        flexGrow={1}>
        <PagerView
          ref={ref}
          onPageSelected={e => {
            setCurrentPosition(e.nativeEvent.position);
          }}
          style={{
            flexGrow: 1,
          }}
          initialPage={0}>
          <View key="1">
            <Hint
              handleRightArrowPress={handleRightArrowPress}
              currentPosition={currentPosition}
            />
          </View>
          <View key="2">
            <OsnovniPodaci
              handleRightArrowPress={handleRightArrowPress}
              handleLeftArrowPress={handleLeftArrowPress}
              currentPosition={currentPosition}
            />
          </View>
          <View key="3">
            <RadnoVrijeme
              handleRightArrowPress={handleRightArrowPress}
              handleLeftArrowPress={handleLeftArrowPress}
              currentPosition={currentPosition}
            />
          </View>
        </PagerView>
      </KeyboardAvoidingView>
    </Box>
  );
};

export default EstablishmentRegistrationForm;
