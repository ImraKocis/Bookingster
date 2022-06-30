import { View, Text } from 'native-base';
import React from 'react';
import { Dimensions, TouchableOpacity } from 'react-native';
import { backgroundColor, primary } from '../../../assets/getColors';

function Table() {
  return (
    <TouchableOpacity
      style={{
        margin: 5,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: primary,
        elevation: 6,
        flex: 1,
        maxWidth: 70,
        minHeight: 70,
      }}
    >
      <Text color="white" fontSize="lg" fontWeight="bold">
        5
      </Text>
    </TouchableOpacity>
  );
}

export default Table;
