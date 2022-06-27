import {
  View,
  SafeAreaView,
  Image,
  KeyboardAvoidingView,
  TouchableOpacity,
  Platform,
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
import { useDispatch, useSelector } from 'react-redux';
import IconVector from 'react-native-vector-icons/MaterialIcons';
import PropTypes from 'prop-types';
import React, { useState, useEffect } from 'react';
import { GoogleSignin, GoogleSigninButton } from '@react-native-google-signin/google-signin';
import auth from '@react-native-firebase/auth';
import signUpStyle from './signUpStyle';
import { LoadSignUpImg } from '../../assets/getImages';
import { fetchGoogleKey, selectorGoogle } from '../../redux/features/googleSlice';
import { selectUser } from '../../redux/features/userSlice';
import userPost from '../../api/userPost';
import userGet from '../../api/userGet';

const styles = signUpStyle;

function SignUp({ signUpType, setUserInfo }) {
  const googleKey = useSelector(selectorGoogle);
  const user = useSelector(selectUser);
  const dispatch = useDispatch();
  const [SignUpUrl, setSignUpUrl] = useState();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [ime, setIme] = useState('');
  const [prezime, setPrezime] = useState('');
  const [signUpSuccess, setSignUpSuccess] = useState(false);
  const [validationError, setValidationError] = useState({});

  const [userFB, setUserFB] = useState(null);

  const saveUserToFirebase = () => {
    // console.log('USERFB =>', userFB.authType);
    // console.log('USER IF SAVE TO FIREBASE', user);
    if ((userFB.isNewUser && userFB.authType === 'google') || userFB.authType === 'emailpassword') {
      userPost({
        name: userFB.authType === 'google' ? userFB.displayName : ime,
        lastname: userFB.authType === 'google' ? null : prezime,
        authType: userFB.authType,
        photoURL:
          userFB.photoURL == null
            ? `https://ui-avatars.com/api/?name=${ime}+${prezime}&background=random&rounded=true`
            : userFB.photoURL,
        accountType: signUpType,
        UID: userFB.uid,
      }).then((response) => {
        setUserInfo(response.user);
        console.log('API RESPONSE =>', response.user);
      });
    } else {
      userGet({ uid: userFB.uid })
        .then((response) => {
          setUserInfo(response.user);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  };

  const GetUrls = async () => {
    setSignUpUrl(await LoadSignUpImg());
  };
  const SignUpUser = () => {
    const errors = {};
    if (!ime || ime.trim().length < 1) errors.ime = 'Ime je obavezno';
    if (!prezime || prezime.trim().length < 1) errors.prezime = 'Prezime je obavezno';
    if (password !== confirmPassword) errors.confirmPassword = 'Lozinke se moraju podudarati';
    if (!password) errors.password = 'Lozinka je obavezna';
    if (!email) errors.email = 'Email je obavezan';

    if (email && password) {
      auth()
        .createUserWithEmailAndPassword(email, password)
        .then((userCredentials) => {
          console.log('USER SIGN IN=> ', userCredentials.user);

          setUserFB({
            uid: userCredentials.user.uid,
            displayName: userCredentials.user.displayName,
            photoURL: userCredentials.user.photoURL,
            authType: 'emailpassword',
          });
          setSignUpSuccess(true);
          console.log('User account created & signed in!');
        })
        .catch((error) => {
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
    const { idToken } = await GoogleSignin.signIn();
    const googleCredential = auth.GoogleAuthProvider.credential(idToken);

    const credentials = auth().signInWithCredential(googleCredential);
    credentials.then((credential) => {
      setUserFB({
        uid: credential.user.uid,
        displayName: credential.user.displayName,
        photoURL: credential.user.photoURL,
        authType: 'google',
        isNewUser: credential.additionalUserInfo.isNewUser,
      });

      setSignUpSuccess(true);
      // saveUserToFirebase();
    });

    return credentials;
  };

  GoogleSignin.configure({
    webClientId: googleKey,
  });

  useEffect(() => {
    dispatch(fetchGoogleKey());
    GetUrls();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    console.log('userFB =>', userFB);
    if (userFB) {
      saveUserToFirebase();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userFB]);

  return (
    <SafeAreaView style={styles.mainView}>
      <View style={styles.imageContainer}>
        <View style={styles.imageView}>
          <Image style={styles.image} source={{ uri: SignUpUrl }} />
        </View>
      </View>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        keyboardVerticalOffset={Platform.OS === 'ios' ? 0 : 20}
        enabled={Platform.OS === 'ios'}
        style={styles.container}
      >
        <View style={styles.paperView}>
          <View style={styles.headerView}>
            <Heading
              size="xl"
              fontWeight="600"
              color="coolGray.800"
              _dark={{
                color: 'warmGray.50',
              }}
            >
              Registracija
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
                      onChangeText={(text) => setIme(text)}
                      value={ime}
                    />
                    <FormControl.ErrorMessage leftIcon={<WarningOutlineIcon size="xs" />}>
                      {validationError.ime}
                    </FormControl.ErrorMessage>
                  </FormControl>
                  <FormControl flex={0.45} isInvalid={'prezime' in validationError}>
                    <Input
                      variant="underlined"
                      fontSize={15}
                      color="black"
                      onChangeText={(value) => setPrezime(value)}
                      value={prezime}
                      placeholder="Prezime"
                    />
                    <FormControl.ErrorMessage leftIcon={<WarningOutlineIcon size="xs" />}>
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
                  }}
                >
                  <Input
                    variant="underlined"
                    fontSize={15}
                    color="black"
                    keyboardType="email-address"
                    onChangeText={(value) => setEmail(value)}
                    value={email}
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
                  <FormControl.ErrorMessage leftIcon={<WarningOutlineIcon size="xs" />}>
                    {validationError.email}
                  </FormControl.ErrorMessage>
                </FormControl>
                <FormControl
                  flex={1}
                  isInvalid={'password' in validationError}
                  w={{
                    base: '100%',
                    md: '30%',
                  }}
                >
                  <Input
                    variant="underlined"
                    fontSize={15}
                    color="black"
                    secureTextEntry
                    onChangeText={(value) => setPassword(value)}
                    value={password}
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
                  <FormControl.ErrorMessage leftIcon={<WarningOutlineIcon size="xs" />}>
                    {validationError.password}
                  </FormControl.ErrorMessage>
                </FormControl>
                <FormControl
                  flex={1}
                  isInvalid={'confirmPassword' in validationError}
                  w={{
                    base: '100%',
                    md: '30%',
                  }}
                >
                  <Input
                    variant="underlined"
                    fontSize={15}
                    color="black"
                    secureTextEntry
                    onChangeText={(value) => setConfirmPassword(value)}
                    value={confirmPassword}
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
                  <FormControl.ErrorMessage leftIcon={<WarningOutlineIcon size="xs" />}>
                    {validationError.confirmPassword}
                  </FormControl.ErrorMessage>
                </FormControl>
                {signUpSuccess && (
                  <Center marginBottom={2}>
                    {user && !user.isNewUser ? (
                      <Text fontSize={16}>Uspješna prijava</Text>
                    ) : (
                      <Text fontSize={16}>Uspješna registracija</Text>
                    )}
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
                      style={{ width: 200, height: 50 }}
                      size={GoogleSigninButton.Size.Wide}
                      color={GoogleSigninButton.Color.Light}
                    />
                  </HStack>
                </Center>
              </VStack>
              <HStack
                flex={0.1}
                width="100%"
                position="absolute"
                justifyContent="center"
                alignItems="center"
                bottom={1}
              >
                <Text>© 2022 Bookingster - Sva prava pridržana.</Text>
              </HStack>
            </Box>
          </Center>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

SignUp.propTypes = {
  signUpType: PropTypes.number.isRequired,
  setUserInfo: PropTypes.func.isRequired,
};

export default SignUp;
