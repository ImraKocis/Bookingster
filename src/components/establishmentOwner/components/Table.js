import { View, Text } from 'native-base';
import React from 'react';
import { Dimensions, TouchableOpacity } from 'react-native';
import PropType from 'prop-types';
import { backgroundColor, primary, neutral } from '../../../assets/getColors';

function Table({ item }) {
  return (
    <TouchableOpacity
      style={{
        margin: 5,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: item.reserved ? primary : 'gray',
        elevation: 6,
        flex: 1,
        maxWidth: 70,
        minHeight: 70,
      }}
    >
      <Text color="white" fontSize="lg" fontWeight="bold">
        {item.capacity}
      </Text>
    </TouchableOpacity>
  );
}

Table.propTypes = {
  // eslint-disable-next-line react/forbid-prop-types
  item: PropType.object.isRequired,
};

export default Table;
