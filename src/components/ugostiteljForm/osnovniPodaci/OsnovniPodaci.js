import { TouchableOpacity } from 'react-native';
import React, { useEffect, useState, useRef } from 'react';
import { Box, Text, Heading, HStack, Input, VStack } from 'native-base';
import VectorIcon from 'react-native-vector-icons/SimpleLineIcons';
import { Formik } from 'formik';
import * as yup from 'yup';
import PropTypes from 'prop-types';
import Footer from '../../Footer';
import KeyboardAvoidingViewWrapper from '../../keyboardAvoidingViewWrapper/KeyboardAvoidingViewWrapper';

const phoneRegExp =
  /^(\+?\d{0,4})?\s?-?\s?(\(?\d{3}\)?)\s?-?\s?(\(?\d{3}\)?)\s?-?\s?(\(?\d{4}\)?)?$/;
const validationSchema = yup.object().shape({
  oib: yup
    .string()
    .required('OIB je obavezan')
    .matches(/^(?:HR)?(\d{10}(\d))$/, 'OIB nije ispravan'),
  naziv: yup.string().required('Naziv je obavezan'),
  drzava: yup.string().required('Država je obavezna'),
  mjesto: yup.string().required('Mjesto je obavezno'),
  adresa: yup.string().required('Adresa je obavezna'),
  telefon: yup.string().matches(phoneRegExp, 'Broj telefona je nevažeći'),
});

function OsnovniPodaci({ handleRightArrowPress, handleLeftArrowPress, setScreenTwo }) {
  const formRef = useRef();
  const [oib, setOib] = useState();
  const [naziv, setNaziv] = useState();
  const [mjesto, setMjesto] = useState();
  const [adresa, setAdresa] = useState();
  const [drzava, setDrzava] = useState();
  const [telefon, setTelefon] = useState();
  const [data, setData] = useState({});

  const obj = { location: {} };

  // console.log('useRef', formRef);

  useEffect(() => {
    // console.log('Formik Values =====>', formRef.current.values);

    if (oib) obj.oib = oib;
    if (naziv) obj.name = naziv;
    if (adresa) obj.location.address = adresa;
    if (mjesto) obj.location.city = mjesto;
    if (drzava) obj.location.country = drzava;
    if (telefon) obj.phoneNumber = telefon;

    setScreenTwo(obj);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [oib, naziv, adresa, drzava, mjesto, telefon]);

  return (
    <Formik
      initialValues={{
        oib: '',
        naziv: '',
        drzava: '',
        mjesto: '',
        adresa: '',
        telefon: '',
      }}
      // innerRef={formRef}
      validateOnMount
      validationSchema={validationSchema}
    >
      {({ handleChange, handleBlur, values, touched, errors, isValid }) => (
        <Box borderTopRadius={50} marginTop={5} elevation={20} flex={1} backgroundColor="white">
          <VStack flex={1}>
            <Input
              onChangeText={handleChange('oib')}
              // onChange={(e) =>console.log() e.nativeEvent.text}
              onBlur={handleBlur('oib')}
              value={values.oib}
              placeholder="OIB subjekta*"
              variant="underlined"
              fontSize={15}
              alignSelf="center"
              width="80%"
              color="black"
              maxLength={11}
            />

            {touched.oib && errors.oib ? (
              <Box width="80%" alignSelf="center" alignItems="flex-start">
                <Text color="red.500">{errors.oib}</Text>
              </Box>
            ) : (
              setOib(values.oib)
            )}
            <Input
              onChangeText={handleChange('naziv')}
              onBlur={handleBlur('naziv')}
              value={values.naziv}
              placeholder="Naziv"
              variant="underlined"
              fontSize={15}
              alignSelf="center"
              width="80%"
              color="black"
            />
            {touched.naziv && errors.naziv ? (
              <Box width="80%" alignSelf="center" alignItems="flex-start">
                <Text color="red.500">{errors.naziv}</Text>
              </Box>
            ) : (
              setNaziv(values.naziv)
            )}
            <Input
              onChangeText={handleChange('telefon')}
              onBlur={handleBlur('telefon')}
              value={values.telefon}
              placeholder="Broj telefona"
              variant="underlined"
              fontSize={15}
              alignSelf="center"
              width="80%"
              color="black"
            />
            {touched.telefon && errors.telefon ? (
              <Box width="80%" alignSelf="center" alignItems="flex-start">
                <Text color="red.500">{errors.telefon}</Text>
              </Box>
            ) : (
              setTelefon(values.telefon)
            )}
            <Heading margin="5%" marginTop="10%" size="lg" fontWeight="bold">
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
                width="70%"
                color="black"
              />
              {touched.drzava && errors.drzava ? (
                <Box width="70%" alignSelf="center" alignItems="flex-start">
                  <Text color="red.500">{errors.drzava}</Text>
                </Box>
              ) : (
                setDrzava(values.drzava)
              )}
              <Input
                onChangeText={handleChange('mjesto')}
                onBlur={handleBlur('mjesto')}
                value={values.mjesto}
                placeholder="Mjesto"
                variant="underlined"
                fontSize={15}
                alignSelf="center"
                width="70%"
                color="black"
              />

              {touched.mjesto && errors.mjesto ? (
                <Box width="70%" alignSelf="center" alignItems="flex-start">
                  <Text color="red.500">{errors.mjesto}</Text>
                </Box>
              ) : (
                setMjesto(values.mjesto)
              )}
              <Input
                onChangeText={handleChange('adresa')}
                onBlur={handleBlur('adresa')}
                value={values.adresa}
                placeholder="Ulica i broj"
                variant="underlined"
                fontSize={15}
                alignSelf="center"
                width="70%"
                color="black"
              />
              {touched.adresa && errors.adresa ? (
                <Box width="70%" alignSelf="center" alignItems="flex-start">
                  <Text color="red.500">{errors.adresa}</Text>
                </Box>
              ) : (
                setAdresa(values.adresa)
              )}
            </VStack>

            <HStack flex={0.2} justifyContent="space-between">
              <TouchableOpacity onPress={handleLeftArrowPress} style={{ padding: 5 }}>
                <VectorIcon size={25} color="black" name="arrow-left" />
              </TouchableOpacity>

              <TouchableOpacity
                disabled={!isValid}
                onPress={handleRightArrowPress}
                style={{ padding: 5 }}
              >
                <VectorIcon size={25} color={isValid ? 'black' : 'gray'} name="arrow-right" />
              </TouchableOpacity>
            </HStack>
            <Footer />
          </VStack>
        </Box>
      )}
    </Formik>
  );
}

OsnovniPodaci.propTypes = {
  handleLeftArrowPress: PropTypes.func.isRequired,
  handleRightArrowPress: PropTypes.func.isRequired,
  setScreenTwo: PropTypes.func.isRequired,
};

export default OsnovniPodaci;
