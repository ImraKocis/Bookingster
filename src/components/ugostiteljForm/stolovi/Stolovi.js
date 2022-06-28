import { TouchableOpacity, View } from 'react-native';
import React, { useState, useEffect } from 'react';
import { Box, HStack, VStack, Text, Input, Divider, Select } from 'native-base';
import VectorIcon from 'react-native-vector-icons/SimpleLineIcons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

import { Formik } from 'formik';

import * as yup from 'yup';
import PropTypes from 'prop-types';
import Footer from '../../Footer';
import { primary } from '../../../assets/getColors';

const validationSchema = yup.object().shape({
  numOfTables: yup
    .string()
    .matches('\\d+', 'Unos je dopušten samo za brojeve')
    .required('Obvezan unos broja stolova'),
  numOfChairs: yup
    .string()
    .matches('\\d+', 'Unos je dopušten samo za brojeve')
    .required('Obvezan unos broja stolica'),
});

function Stolovi({ handleLeftArrowPress, setFormState }) {
  const [selectable, setSelectable] = useState(true);
  const [numOfSelected, setNumOfSelected] = useState({ numOfSelected: 0 });
  const [selectedArr, setSelectedArr] = useState([]);
  const [tablesChairs, setTablesChairs] = useState({
    two: 0,
    three: 0,
    four: 0,
    five: 0,
    sixAndMore: 0,
  });
  const [tables, setTables] = useState([
    {
      index: 'br stola',
      numOfChairs: 99,
    },
  ]);
  const handleTableChange = (val) => {
    // handleChange('numOfTables');
    const arr = [];
    if (val >= 2 && val <= 99) {
      // console.log(val);
      for (let i = 1; i <= val; i += 1) {
        arr.push({ index: i, numOfSelectableChairs: i });
      }
      console.log(arr);
      setSelectable(arr);
    }
  };

  const handleSelectChange = (key, value) => {
    // console.log(key);
    setTablesChairs({ ...tablesChairs, [key]: value });
  };

  const addTable = (numOfTables, numOfChairs) => {
    const arr = [];

    console.log(numOfTables, numOfChairs);
    if (!arr.some((obj) => obj.nChairs === parseInt(numOfChairs, 10))) {
      arr.push({ nTables: numOfTables, nChairs: numOfChairs });
      setSelectedArr([...selectedArr, ...arr]);
    }
  };

  useEffect(() => {
    setNumOfSelected({
      numOfSelected: Object.values(tablesChairs).reduce((a, b) => a + b),
    });
    // console.log(numOfSelected);
  }, [tablesChairs]);

  function renderRow(c, t, index) {
    const nTables = parseInt(t, 10);
    const nChairs = parseInt(c, 10);
    console.log(selectedArr);
    return (
      <View key={index}>
        <HStack marginRight={2} justifyContent="center" alignItems="center">
          <Text fontSize="md" mx={10}>
            {t} {nTables === 1 && 'stol'} {nTables > 1 && nTables < 5 ? 'stola' : 'stolova'} s {c}{' '}
            {nChairs === 1 ? 'mjestom' : 'mjesta'}
          </Text>
          <MaterialIcons name="highlight-remove" size={25} color={primary} />
        </HStack>
        <HStack justifyContent="center">
          <Divider color="black" my={2} width="90%" thickness={2} />
        </HStack>
      </View>
    );
  }

  return (
    <Formik
      initialValues={{ numOfTables: '', numOfChairs: '' }}
      onSubmit={(values) => console.log(values)}
      validateOnMount
      validationSchema={validationSchema}
    >
      {({ handleChange, handleBlur, values, touched, errors, isValid }) => (
        <Box borderTopRadius={50} marginTop={5} elevation={20} flex={1} backgroundColor="white">
          <VStack flex={0.3}>
            <HStack alignItems="center" justifyContent="space-around" flex={1}>
              <Text fontSize="md">Upišite broj stolica</Text>
              <Input
                keyboardType="numeric"
                onBlur={handleBlur('numOfChairs')}
                onChangeText={handleChange('numOfChairs')}
                value={values.numOfChairs}
                variant="underlined"
                placeholder="Broj stolica"
                placeholderTextColor="gray.500"
                fontSize={13}
                alignSelf="center"
                width="20%"
                color="black"
                maxLength={2}
              />
            </HStack>

            {!errors.numOfChairs && touched.numOfChairs && (
              <HStack alignItems="center" justifyContent="space-around" flex={1}>
                <Text flex={1} fontSize="md">
                  Upišite broj stolova s odabranim brojem mjesta
                </Text>
                <Input
                  keyboardType="numeric"
                  onBlur={handleBlur('numOfTables')}
                  onChangeText={handleChange('numOfTables')}
                  value={values.numOfTables}
                  variant="underlined"
                  placeholder="Broj stolova"
                  placeholderTextColor="gray.500"
                  fontSize={13}
                  alignSelf="center"
                  width="20%"
                  color="black"
                  maxLength={2}
                />
              </HStack>
            )}
            <HStack justifyContent="center">
              <TouchableOpacity
                onPress={() => addTable(values.numOfTables, values.numOfChairs)}
                disabled={!isValid}
                style={{
                  flex: 1,
                  padding: 1,
                  maxWidth: '30%',
                  alignItems: 'center',
                  backgroundColor: isValid ? primary : 'gray',
                  borderRadius: 10,
                  alignSelf: 'center',
                }}
              >
                <Text color="white" fontSize="md">
                  Dodaj
                </Text>
              </TouchableOpacity>
            </HStack>
          </VStack>
          <VStack flex={0.1} w="100%" alignItems="center" justifyContent="center">
            {touched.numOfTables && errors.numOfTables && !errors.numOfChairs && (
              <Text color="red.500">{errors.numOfTables}</Text>
            )}
            {touched.numOfChairs && errors.numOfChairs && (
              <Text color="red.500">{errors.numOfChairs}</Text>
            )}

            <Divider width="70%" my={3} thickness={2} />
          </VStack>
          <VStack flex={0.6} alignItems="center" s>
            {isValid &&
              selectedArr.map((item, index) => renderRow(item.nChairs, item.nTables, index))}
          </VStack>
          <HStack
            width="100%"
            position="absolute"
            // alignItems="center"
            bottom={8}
            flex={0.2}
            justifyContent="center"
          >
            <TouchableOpacity
              onPress={handleLeftArrowPress}
              style={{
                flex: 1,
                padding: 5,
                alignSelf: 'flex-start',
              }}
            >
              <VectorIcon size={25} color="black" name="arrow-left" />
            </TouchableOpacity>

            <TouchableOpacity
              // disabled={!isValid}

              onPress={setFormState}
              style={{
                flex: 1,
                maxWidth: '30%',
                minHeight: '100%',
                padding: 5,
                alignItems: 'center',
                justifyContent: 'center',
                alignSelf: 'flex-start',
                marginRight: 25,
                borderRadius: 10,

                backgroundColor: primary,
              }}
            >
              <Text color="white" fontWeight="bold" fontSize="md">
                Potvrdi
              </Text>
            </TouchableOpacity>
          </HStack>
          <Footer />
        </Box>
      )}
    </Formik>
  );
}

Stolovi.propTypes = {
  handleLeftArrowPress: PropTypes.func.isRequired,
  setFormState: PropTypes.func.isRequired,
};

export default Stolovi;
