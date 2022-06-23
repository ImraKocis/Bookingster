import {View, Text} from 'react-native';
import React from 'react';
import StepIndicator from 'react-native-step-indicator';
import {Labels} from './labels';
import {stepIndicatorStyle} from './styles';
import {useState} from 'react';
import {useEffect} from 'react';

const labels = Labels;
const customStyles = stepIndicatorStyle;

const CustomStepIndicator = ({currentPosition, PagerView}) => {
  const [step, setStep] = useState(currentPosition);

  useEffect(() => {
    PagerView.current.setPage(step);
  }, [step]);
  return (
    <StepIndicator
      stepCount={5}
      customStyles={customStyles}
      currentPosition={step}
      onPress={val => setStep(val)}
      labels={labels}
    />
  );
};

export default CustomStepIndicator;
