import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  Image,
  KeyboardAvoidingView,
  TouchableOpacity,
} from 'react-native';
import {
  Input,
  Icon,
  FormControl,
  WarningOutlineIcon,
  Box,
  VStack,
  Center,
  Heading,
} from 'native-base';

import {TextInput} from 'react-native-paper';
import IconVector from 'react-native-vector-icons/MaterialIcons';
import React, {useState, useEffect} from 'react';
import {signupStyle} from './signupStyle';
import {LoadSignUpImg, LoadGoogleImg} from '../../assets/getImages';
import auth from '@react-native-firebase/auth';
import {neutral} from '../../assets/getColors';

const styles = signupStyle;

const SignUp = () => {
  const [SignUpUrl, setSignUpUrl] = useState();
  const [GoogleUrl, setGoogleUrl] = useState();
  const [email, setEmail] = useState(null);
  const [password, setPassword] = useState(null);
  const [confirmPassword, setConfirmPassword] = useState(null);
  const [ime, setIme] = useState(null);
  const [prezime, setPrezime] = useState(null);
  const [validationError, setValidationError] = useState({});

  const GetUrls = async () => {
    setSignUpUrl(await LoadSignUpImg());
    setGoogleUrl(await LoadGoogleImg());
  };
  const SignUpUser = () => {
    var errors = {};
    if (!ime || ime.trim().lenght < 1) errors.ime = 'Ime je obavezno';
    if (!prezime || prezime.trim().lenght < 1)
      errors.prezime = 'Prezime je obavezno';
    if (password != confirmPassword)
      errors.password = 'Lozinke se moraju podudarati';
    if (errors == {}) r;
    auth()
      .createUserWithEmailAndPassword(email, password)
      .then(() => {
        console.log('User account created & signed in!');
      })
      .catch(error => {
        if (error.code === 'auth/email-already-in-use') {
          errors.email = 'Odabrani email već postoji';
        }

        if (error.code === 'auth/invalid-email') {
          errors.email = 'Neispravan email ili lozinka';
        }
        if (error.code === 'auth/invalid-password') {
          errors.password = 'Neispravan email ili lozinka';
        }
        console.error(error);
      });
    setValidationError(errors);
  };
  useEffect(() => {
    GetUrls();
  }, []);
  return (
    <SafeAreaView style={styles.mainView}>
      <View style={styles.imageContainer}>
        <View style={styles.imageVeiw}>
          <Image style={styles.image} source={{uri: SignUpUrl}}></Image>
        </View>
      </View>
      <KeyboardAvoidingView
        behavior={Platform.OS == 'ios' ? 'padding' : 'height'}
        keyboardVerticalOffset={Platform.OS == 'ios' ? 0 : 20}
        enabled={Platform.OS === 'ios' ? true : false}
        style={styles.container}>
        <View style={styles.paperView}>
          <View style={styles.headerView}>
            <Text style={styles.header}>Registracija</Text>
          </View>
          <View style={styles.formView}>
            <View style={styles.formImePrezime}>
              <FormControl
                isInvalid={'ime' in validationError}
                w={{
                  base: '45%',
                  md: '30%',
                }}>
                <Input
                  variant="underlined"
                  fontSize={15}
                  color="black"
                  _text={{
                    color: 'red',
                  }}
                  onChangeText={value => setIme(value)}
                  InputLeftElement={
                    <Icon
                      as={<IconVector name="person-outline" />}
                      size="6"
                      ml={3}
                      color="black"
                      marginRight={2}
                    />
                  }
                  placeholder="Ime"
                />
                <FormControl.ErrorMessage
                  leftIcon={<WarningOutlineIcon size="xs" />}>
                  {validationError.ime}
                </FormControl.ErrorMessage>
              </FormControl>
              <FormControl
                w={{
                  base: '45%',
                  md: '30%',
                }}>
                <Input
                  variant="underlined"
                  fontSize={15}
                  color="black"
                  onChangeText={value => setPrezime(value)}
                  placeholder="Prezime"
                />
              </FormControl>
            </View>
            <Input
              variant="underlined"
              fontSize={15}
              color="black"
              onChangeText={value => setEmail(value)}
              w={{
                base: '70%',
                md: '30%',
              }}
              InputLeftElement={
                <Icon
                  as={<IconVector name="alternate-email" />}
                  size="6"
                  ml={3}
                  color="black"
                  marginRight={2}
                />
              }
              placeholder="Email"
            />
            <Input
              variant="underlined"
              fontSize={15}
              color="black"
              onChangeText={value => setPassword(value)}
              w={{
                base: '70%',
                md: '30%',
              }}
              InputLeftElement={
                <Icon
                  as={<IconVector name="lock-outline" />}
                  size="6"
                  ml={3}
                  color="black"
                  marginRight={2}
                />
              }
              placeholder="Lozinka"
            />
            <Input
              variant="underlined"
              fontSize={15}
              color="black"
              onChangeText={value => setConfirmPassword(value)}
              w={{
                base: '70%',
                md: '30%',
              }}
              InputLeftElement={
                <Icon
                  as={<IconVector name="check" />}
                  size="6"
                  ml={3}
                  color="black"
                  marginRight={2}
                />
              }
              placeholder="Potvrdi lozinku"
            />
            {/* {validationError && (
              <View style={styles.errorText}>
                <Text>{validationError}</Text>
              </View>
            )} */}
            <View style={styles.buttonVeiw}>
              <TouchableOpacity style={styles.button} onPress={SignUpUser}>
                <Text style={styles.buttonText}>Registriraj se</Text>
              </TouchableOpacity>
            </View>
            <View style={styles.signWithView}>
              <Text style={styles.signWithText}>ili se registriraj s</Text>
            </View>
            <View style={styles.goolgeButtonView}>
              <TouchableOpacity
                // onPress={onGoogleButtonPress}
                style={styles.googleButton}>
                <Image
                  style={styles.googleImage}
                  source={{uri: GoogleUrl}}></Image>
              </TouchableOpacity>
            </View>
          </View>

          <View style={styles.footerView}>
            <Text style={styles.footerText}>
              © 2022 Bookingster - Sva prava pridržana.
            </Text>
          </View>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default SignUp;
