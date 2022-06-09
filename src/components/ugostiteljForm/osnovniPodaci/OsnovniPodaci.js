import {View, Text} from 'react-native';
import React from 'react';
import {Box, FormControl, Input, VStack} from 'native-base';

const OsnovniPodaci = ({dataObject, setDataObject}) => {
  return (
    <Box flex={1}>
      <VStack>
        <Input
          placeholder="OIB subjekta"
          variant="underlined"
          fontSize={15}
          color="black"
        />
      </VStack>
    </Box>
  );
};

export default OsnovniPodaci;
