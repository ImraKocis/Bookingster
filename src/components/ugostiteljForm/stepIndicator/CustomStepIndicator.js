import {View, Text} from 'react-native';
import React from 'react';
import StepIndicator from 'react-native-step-indicator';
import {Labels} from './labels';
import {stepIndicatorStyle} from './styles';

const labels = Labels;
const customStyles = stepIndicatorStyle;

const CustomStepIndicator = ({currentPosition}) => {
  return (
    <StepIndicator
      stepCount={4}
      customStyles={customStyles}
      currentPosition={currentPosition}
      labels={labels}
    />
  );
};

export default CustomStepIndicator;
