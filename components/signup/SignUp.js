import {
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
  HStack,
  Text,
} from 'native-base';

import IconVector from 'react-native-vector-icons/MaterialIcons';
import React, {useState, useEffect} from 'react';
import {signupStyle} from './signupStyle';
import {LoadSignUpImg, LoadGoogleImg} from '../../assets/getImages';
import auth from '@react-native-firebase/auth';
import {
  GoogleSignin,
  GoogleSigninButton,
} from '@react-native-google-signin/google-signin';
import api_get_googleKey from '../../assets/getKeys';

const styles = signupStyle;

const SignUp = ({signUpType}) => {
  const [SignUpUrl, setSignUpUrl] = useState();
  const [GoogleUrl, setGoogleUrl] = useState();
  const [googleKey, setGoogleKey] = useState();
  const [email, setEmail] = useState(null);
  const [password, setPassword] = useState(null);
  const [confirmPassword, setConfirmPassword] = useState(null);
  const [ime, setIme] = useState(null);
  const [prezime, setPrezime] = useState(null);
  const [signUpSuccess, setSignUpSuccess] = useState(false);
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
      errors.confirmPassword = 'Lozinke se moraju podudarati';
    if (!password) errors.password = 'Lozinka je obavezna';
    if (!email) errors.email = 'Email je obavezan';
    if (email && password) {
      auth()
        .createUserWithEmailAndPassword(email, password)
        .then(() => {
          console.log('User account created & signed in!');
          setSignUpSuccess(true);
        })
        .catch(error => {
          if (error.code === 'auth/email-already-in-use') {
            errors.email = 'Odabrani email već postoji';
          }

          if (error.code === 'auth/invalid-email') {
            errors.email = 'Neispravan email';
          }
          if (error.code === 'auth/invalid-password') {
            errors.password = 'Neispravan lozinka';
          }
          console.error(error);
        });
    }
    setValidationError(errors);
  };
  const onGoogleButtonPress = async () => {
    const {idToken} = await GoogleSignin.signIn();
    const googleCredential = auth.GoogleAuthProvider.credential(idToken);

    const credentials = auth().signInWithCredential(googleCredential);
    credentials.then(credential => {
      console.log(credential.additionalUserInfo.isNewUser);
    });
    setSignUpSuccess(true);
    return credentials;
  };

  GoogleSignin.configure({
    webClientId: googleKey,
  });

  const get_google_key = async () => {
    const res = await api_get_googleKey();
    setGoogleKey(res);
  };

  useEffect(() => {
    get_google_key();
    GetUrls();
  }, []);
  return (
    <SafeAreaView style={styles.mainView}>
      <View style={styles.imageContainer}>
        <View style={styles.imageVeiw}>
          <Image style={styles.image} source={{uri: SignUpUrl}} />
        </View>
      </View>
      <KeyboardAvoidingView
        behavior={Platform.OS == 'ios' ? 'padding' : 'height'}
        keyboardVerticalOffset={Platform.OS == 'ios' ? 0 : 20}
        enabled={Platform.OS === 'ios' ? true : false}
        style={styles.container}>
        <View style={styles.paperView}>
          <View style={styles.headerView}>
            <Heading
              size="xl"
              fontWeight="600"
              color="coolGray.800"
              _dark={{
                color: 'warmGray.50',
              }}>
              Registracija, {signUpType}
            </Heading>
          </View>
          <Center flex={1} justifyContent="space-between" w="100%">
            <Box flex={1} marginTop="2" safeArea w="80%">
              <VStack flex={0.67}>
                <HStack flex={1} justifyContent="space-between">
                  <FormControl flex={0.45} isInvalid={'ime' in validationError}>
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
                    flex={0.45}
                    isInvalid={'prezime' in validationError}>
                    <Input
                      variant="underlined"
                      fontSize={15}
                      color="black"
                      onChangeText={value => setPrezime(value)}
                      placeholder="Prezime"
                    />
                    <FormControl.ErrorMessage
                      leftIcon={<WarningOutlineIcon size="xs" />}>
                      {validationError.prezime}
                    </FormControl.ErrorMessage>
                  </FormControl>
                </HStack>
                <FormControl
                  flex={1}
                  isInvalid={'email' in validationError}
                  w={{
                    base: '100%',
                    md: '30%',
                  }}>
                  <Input
                    variant="underlined"
                    fontSize={15}
                    color="black"
                    onChangeText={value => setEmail(value)}
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
                  <FormControl.ErrorMessage
                    leftIcon={<WarningOutlineIcon size="xs" />}>
                    {validationError.email}
                  </FormControl.ErrorMessage>
                </FormControl>
                <FormControl
                  flex={1}
                  isInvalid={'password' in validationError}
                  w={{
                    base: '100%',
                    md: '30%',
                  }}>
                  <Input
                    variant="underlined"
                    fontSize={15}
                    color="black"
                    secureTextEntry={true}
                    onChangeText={value => setPassword(value)}
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
                  <FormControl.ErrorMessage
                    leftIcon={<WarningOutlineIcon size="xs" />}>
                    {validationError.password}
                  </FormControl.ErrorMessage>
                </FormControl>
                <FormControl
                  flex={1}
                  isInvalid={'confirmPassword' in validationError}
                  w={{
                    base: '100%',
                    md: '30%',
                  }}>
                  <Input
                    variant="underlined"
                    fontSize={15}
                    color="black"
                    secureTextEntry={true}
                    onChangeText={value => setConfirmPassword(value)}
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
                  <FormControl.ErrorMessage
                    leftIcon={<WarningOutlineIcon size="xs" />}>
                    {validationError.confirmPassword}
                  </FormControl.ErrorMessage>
                </FormControl>
                {signUpSuccess && (
                  <Center marginBottom={2}>
                    <Text fontSize={16}>Uspješna registracija</Text>
                  </Center>
                )}
              </VStack>
              <VStack flex={0.2}>
                <Center marginY="5%">
                  <TouchableOpacity style={styles.button} onPress={SignUpUser}>
                    <Text style={styles.buttonText}>Registriraj se</Text>
                  </TouchableOpacity>

                  <HStack marginY={3}>
                    <GoogleSigninButton
                      onPress={onGoogleButtonPress}
                      style={{width: 200, height: 50}}
                      size={GoogleSigninButton.Size.Wide}
                      color={
                        GoogleSigninButton.Color.Light
                      }></GoogleSigninButton>
                  </HStack>
                </Center>
              </VStack>
              <HStack
                flex={0.1}
                width="100%"
                position="absolute"
                justifyContent="center"
                alignItems="center"
                bottom={1}>
                <Text>© 2022 Bookingster - Sva prava pridržana.</Text>
              </HStack>
            </Box>
          </Center>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default SignUp;
