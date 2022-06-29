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

function Stolovi({ handleLeftArrowPress, setFormState, setScreenFive, screenFive }) {
  const [selectedArr, setSelectedArr] = useState([]);

  const handleStringFormat = (c, t) => {
    let str = t.toString();

    if (t === 1) {
      str = `${str} stol`;
    } else if (t > 1 && t < 5) {
      str = `${str} stola`;
    } else if (t.toString().length === 2 && t.toString()[0] !== '1') {
      if (t.toString()[1] > 0 && t.toString()[1] < 5) {
        str = `${str} stola`;
      }
    } else str = `${str} stolova`;

    if (c === 1) str = `${str} s ${c.toString()} mjestom`;
    else str = `${str} s ${c.toString()} mjesta`;

    return str;
  };

  const handleDelete = (c) => {
    console.log('delete');

    // setSelectedArr(screenFive.filter((el) => el.nChairs !== c));
    setScreenFive(screenFive.filter((el) => el.nChairs !== c));
  };

  // const handleSelectChange = (key, value) => {
  //   // console.log(key);
  //   setTablesChairs({ ...tablesChairs, [key]: value });
  // };

  const addTable = (numOfTables, numOfChairs) => {
    const arr = [];

    console.log(numOfTables, numOfChairs);
    if (!screenFive.some((obj) => obj.nChairs === numOfChairs)) {
      console.log('if', screenFive);
      arr.push({ nTables: numOfTables, nChairs: numOfChairs });
      // setSelectedArr([...screenFive, ...arr]);
      setScreenFive([...screenFive, ...arr]);
    }
  };

  useEffect(() => {}, []);

  function renderRow(c, t, index) {
    const nTables = parseInt(t, 10);
    const nChairs = parseInt(c, 10);
    // console.log('Pero', selectedArr);
    return (
      <View key={index}>
        <HStack marginRight={2} justifyContent="center" alignItems="center">
          <Text fontSize="md" mx={10}>
            {handleStringFormat(nChairs, nTables)}
          </Text>
          <MaterialIcons
            onPress={() => handleDelete(c)}
            name="highlight-remove"
            size={25}
            color={primary}
          />
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
              <Text ml={10} flex={1} fontSize="md">
                Upišite broj mjesta
              </Text>
              <Input
                mr={10}
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

            <HStack alignItems="center" justifyContent="space-around" flex={1}>
              <Text ml={10} flex={1} fontSize="md">
                Upišite broj stolova s odabranim brojem mjesta
              </Text>
              <Input
                mr={10}
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

            <HStack mt={5} justifyContent="center">
              <TouchableOpacity
                onPress={() => addTable(values.numOfTables, values.numOfChairs)}
                disabled={!isValid && screenFive.some((obj) => obj.nChairs === values.numOfChairs)}
                style={{
                  flex: 1,
                  padding: 1,
                  maxWidth: '30%',
                  alignItems: 'center',
                  backgroundColor:
                    isValid && !screenFive.some((obj) => obj.nChairs === values.numOfChairs)
                      ? primary
                      : 'gray',
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
          <VStack flex={0.6} alignItems="center">
            {screenFive.map((item, index) => renderRow(item.nChairs, item.nTables, index))}
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
  setScreenFive: PropTypes.func.isRequired,
  // eslint-disable-next-line react/forbid-prop-types
  screenFive: PropTypes.array.isRequired,
};

export default Stolovi;
