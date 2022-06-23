import {View} from 'react-native';
import React from 'react';
import {Box, HStack, VStack, Text, Input, Divider} from 'native-base';
import {useState} from 'react';
import {Formik} from 'formik';
import * as yup from 'yup';

const validationSchema = yup.object().shape({
  minChairs: yup
    .number()
    .min(2, 'Minimalan broj stolica je 2')
    .max(15, 'Maksimalan broj stolica je 15'),
  maxChairs: yup
    .number()
    .min(2, 'Minimalan broj stolica je 2')
    .max(15, 'Maksimalan broj stolica je 15'),
  numOfTables: yup
    .number('Molimo upisujte samo brojeve')
    .min(2, 'Minimalan broj stolova je 2')
    .max(99, 'Maksimalan broj stolova je 99'),
});

const runCallback = cb => {
  return cb();
};

const Stolovi = ({}) => {
  const [selectable, setSelectable] = useState(null);
  const [tables, setTables] = useState([
    {
      index: 'br stola',
      numOfChairs: 99,
    },
  ]);
  const handleTableChange = val => {
    console.log(val);
    let arr = [];
    if (val >= 2 && val <= 99) {
      for (let i = 1; i <= val; i++) {
        arr.push({index: i, numOfSelectableChairs: i});
      }
      console.log(arr);
      setSelectable(arr);
    }
  };

  return (
    <Formik
      initialValues={{minChairs: 0, maxChairs: 0}}
      onSubmit={values => console.log(values)}
      validateOnMount={true}
      validationSchema={validationSchema}>
      {({handleChange, handleBlur, values, touched, errors, isValid}) => (
        <Box
          borderTopRadius={50}
          marginTop={5}
          elevation={20}
          flex={1}
          backgroundColor={'white'}>
          <VStack flex={0.25}>
            <HStack
              alignItems={'center'}
              justifyContent={'space-around'}
              flex={1}>
              <Text fontSize={'md'}>Upišite broj stolova u lokalu</Text>
              <Input
                onChangeText={text => {
                  handleChange('numOfTables');
                  handleTableChange(text);
                }}
                onBlur={handleBlur('numOfTables')}
                value={values.numOfTables}
                variant="underlined"
                placeholder="Broj stolova"
                placeholderTextColor={'gray.500'}
                fontSize={13}
                alignSelf="center"
                width={'20%'}
                color="black"
                maxLength={2}
              />
            </HStack>
          </VStack>
          <VStack
            flex={0.05}
            w={'100%'}
            alignItems={'center'}
            justifyContent={'center'}>
            {touched.numOfTables && errors.numOfTables && (
              <Text>{errors.numOfTables}</Text>
            )}
            <Divider width={'70%'} my={3} thickness={2} />
          </VStack>
          <VStack flex={0.6} backgroundColor={'amber.100'}>
            {selectable && <Text>Pero</Text>}
          </VStack>
        </Box>
      )}
    </Formik>
  );
};

export default Stolovi;
