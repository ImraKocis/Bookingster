import {View, Text, TouchableOpacity} from 'react-native';
import React, {useState, useRef} from 'react';
import {backgroundColor, primary} from '../../assets/getColors';
import PagerView from 'react-native-pager-view';
import {useValidation} from 'react-native-form-validator';
import CustomStepIndicator from './stepIndicator/CustomStepIndicator';
import {Box, Input} from 'native-base';
import Hint from './hint/Hint';
import OsnovniPodaci from './osnovniPodaci/OsnovniPodaci';

const EstablishmentRegistrationForm = () => {
  const [dataObject, setDataObject] = useState({
    oib: '',
    naziv: '',
    drzava: '',
    mjesto: '',
    adresa: '',
  });
  const {validate, isFiledError, getErrorsInFiled, getErrorMessage} =
    useValidation({
      state: {dataObject},
    });
  const ref = useRef(PagerView);
  const [currentPosition, setCurrentPosition] = useState(0);
  return (
    <Box flex={1} backgroundColor={backgroundColor}>
      <Box marginTop={5} justifyContent={'center'} flex={0.2} key="1">
        <CustomStepIndicator currentPosition={currentPosition} />
      </Box>
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
          <Hint ViewPager={ref} currentPosition={currentPosition} />
        </View>
        <View key="2">
          <OsnovniPodaci
            validate={validate}
            isFiledError={isFiledError}
            getErrorsInFiled={getErrorsInFiled}
            getErrorMessage={getErrorMessage}
            dataObject={dataObject}
            setDataObject={setDataObject}
          />
        </View>
      </PagerView>
    </Box>
  );
};

export default EstablishmentRegistrationForm;
