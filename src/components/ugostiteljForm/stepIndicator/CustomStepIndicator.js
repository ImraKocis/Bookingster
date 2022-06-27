import React, { useState, useEffect } from 'react';
import StepIndicator from 'react-native-step-indicator';
import PropTypes from 'prop-types';
import Labels from './labels';
import stepIndicatorStyle from './styles';

const labels = Labels;
const customStyles = stepIndicatorStyle;

function CustomStepIndicator({ currentPosition, PagerView }) {
  const [step, setStep] = useState(currentPosition);

  useEffect(() => {
    PagerView.current.setPage(step);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [step]);

  return (
    <StepIndicator
      stepCount={5}
      customStyles={customStyles}
      currentPosition={currentPosition}
      onPress={(val) => setStep(val)}
      labels={labels}
    />
  );
}

CustomStepIndicator.propTypes = {
  currentPosition: PropTypes.number.isRequired,
};

export default CustomStepIndicator;
