import {View, TouchableOpacity} from 'react-native';
import React, {useEffect, useState} from 'react';
import {Box, Text, Heading, HStack, Input, VStack} from 'native-base';
import VectorIcon from 'react-native-vector-icons/SimpleLineIcons';
import {Formik} from 'formik';
import * as yup from 'yup';
import Footer from '../../Footer';

const validationSchema = yup.object().shape({
  oib: yup
    .string()
    .required('OIB je obavezan')
    .matches(/^(?:HR)?(\d{10}(\d))$/, 'OIB nije ispravan'),
  naziv: yup.string().required('Naziv je obavezan'),
  drzava: yup.string().required('Država je obavezna'),
  mjesto: yup.string().required('Mjesto je obavezno'),
  adresa: yup.string().required('Adresa je obavezna'),
});

const OsnovniPodaci = ({
  handleRightArrowPress,
  handleLeftArrowPress,
  currentPosition,
}) => {
  useEffect(() => {
    console.log('Hola Amigo'); //save u redux, u ovome ne treba
  }, [currentPosition]);

  return (
    <Formik
      initialValues={{oib: '', naziv: '', drzava: '', mjesto: '', adresa: ''}}
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
          <VStack flex={1}>
            <Input
              label={'OIB'}
              onChangeText={handleChange('oib')}
              onBlur={handleBlur('oib')}
              value={values.oib}
              placeholder="OIB subjekta*"
              variant="underlined"
              fontSize={15}
              alignSelf="center"
              width={'80%'}
              color="black"
              maxLength={11}
            />

            {touched.oib && errors.oib && (
              <Box width={'80%'} alignSelf={'center'} alignItems={'flex-start'}>
                <Text color={'red.500'}>{errors.oib}</Text>
              </Box>
            )}
            <Input
              onChangeText={handleChange('naziv')}
              onBlur={handleBlur('naziv')}
              value={values.naziv}
              placeholder="Naziv"
              variant="underlined"
              fontSize={15}
              alignSelf="center"
              width={'80%'}
              color="black"
            />
            {touched.naziv && errors.naziv && (
              <Box width={'80%'} alignSelf={'center'} alignItems={'flex-start'}>
                <Text color={'red.500'}>{errors.naziv}</Text>
              </Box>
            )}
            <Heading
              margin={'5%'}
              marginTop={'10%'}
              size={'lg'}
              fontWeight={'bold'}>
              Lokacija
            </Heading>
            <VStack flex={0.8}>
              <Input
                onChangeText={handleChange('drzava')}
                onBlur={handleBlur('drzava')}
                value={values.drzava}
                placeholder="Država"
                variant="underlined"
                fontSize={15}
                alignSelf="center"
                width={'70%'}
                color="black"
              />
              {touched.drzava && errors.drzava && (
                <Box
                  width={'70%'}
                  alignSelf={'center'}
                  alignItems={'flex-start'}>
                  <Text color={'red.500'}>{errors.drzava}</Text>
                </Box>
              )}
              <Input
                onChangeText={handleChange('mjesto')}
                onBlur={handleBlur('mjesto')}
                value={values.mjesto}
                placeholder="Mjesto"
                variant="underlined"
                fontSize={15}
                alignSelf="center"
                width={'70%'}
                color="black"
              />

              {touched.mjesto && errors.mjesto && (
                <Box
                  width={'70%'}
                  alignSelf={'center'}
                  alignItems={'flex-start'}>
                  <Text color={'red.500'}>{errors.mjesto}</Text>
                </Box>
              )}
              <Input
                onChangeText={handleChange('adresa')}
                onBlur={handleBlur('adresa')}
                value={values.adresa}
                placeholder="Ulica i broj"
                variant="underlined"
                fontSize={15}
                alignSelf="center"
                width={'70%'}
                color="black"
              />
              {touched.adresa && errors.adresa && (
                <Box
                  width={'70%'}
                  alignSelf={'center'}
                  alignItems={'flex-start'}>
                  <Text color={'red.500'}>{errors.adresa}</Text>
                </Box>
              )}
            </VStack>

            <HStack flex={0.2} justifyContent={'space-between'}>
              <TouchableOpacity
                onPress={handleLeftArrowPress}
                style={{padding: 5}}>
                <VectorIcon size={25} color={'black'} name="arrow-left" />
              </TouchableOpacity>

              <TouchableOpacity
                disabled={!isValid}
                onPress={handleRightArrowPress}
                style={{padding: 5}}>
                <VectorIcon
                  size={25}
                  color={isValid ? 'black' : 'gray'}
                  name="arrow-right"
                />
              </TouchableOpacity>
            </HStack>
            <Footer />
          </VStack>
        </Box>
      )}
    </Formik>
  );
};

export default OsnovniPodaci;
