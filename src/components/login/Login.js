import {
  Platform,
  Image,
  SafeAreaView,
  View,
  TouchableOpacity,
  KeyboardAvoidingView,
} from 'react-native';
import {
  Box,
  HStack,
  VStack,
  FormControl,
  Center,
  Text,
  Input,
  Icon,
  WarningOutlineIcon,
  Heading,
} from 'native-base';
import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import IconVector from 'react-native-vector-icons/MaterialIcons';
import { useSelector, useDispatch } from 'react-redux';
import auth from '@react-native-firebase/auth';
import { GoogleSignin, GoogleSigninButton } from '@react-native-google-signin/google-signin';
import loginStyle from './loginStyle';
import { LoadSignInImg } from '../../assets/getImages';
import { fetchGoogleKey, selectorGoogle } from '../../redux/features/googleSlice';
import { updateUserInfo } from '../../redux/features/userSlice';
import userGet from '../../api/userGet';

const styles = loginStyle;

function Login({ setUserInfo, setIsNewUser }) {
  const googleKey = useSelector(selectorGoogle);
  // const user = useSelector(selectUser);
  const dispatch = useDispatch();
  const [SignUpUrl, setSignUpUrl] = useState('');
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();

  const [validationError, setValidationError] = useState({});

  const GetUrls = async () => {
    setSignUpUrl(await LoadSignInImg());
  };

  const LoginUser = () => {
    const errors = {};
    if (!email) errors.email = 'Email je obavezan';
    if (!password) errors.password = 'Lozinka je obavezna';
    if (email && password) {
      auth()
        .signInWithEmailAndPassword(email, password)
        .then((userCredentials) => {
          console.log('Logiran');
          userGet(userCredentials.user).then((response) => {
            setUserInfo(response.user);
          });
        })
        .catch((error) => {
          if (error.code === 'auth/invalid-email') errors.email = 'Neispravan email';
          if (error.code === 'auth/invalid-password') errors.password = 'Neispravna lozinka';
          console.log(error);
        });
    }
    setValidationError(errors);
  };
  GoogleSignin.configure({
    webClientId: googleKey,
  });

  const onGoogleButtonPress = async () => {
    const { idToken } = await GoogleSignin.signIn();
    const googleCredential = auth.GoogleAuthProvider.credential(idToken);

    const credentials = auth().signInWithCredential(googleCredential);
    credentials.then((credential) => {
      setIsNewUser(credential.additionalUserInfo.isNewUser);
      if (credential.additionalUserInfo.isNewUser) {
        console.log('peroperic');
        dispatch(
          updateUserInfo({
            accountType: null, // uvijek ce setat accountType na null, kad se logira s googleom
            isNewUser: credential.additionalUserInfo.isNewUser,
            photoURL: credential.user.photoURL,
            displayName: credential.user.displayName,
            uid: credential.user.uid,
          })
        );
      } else {
        console.log('LOGIN UID:', credential.user.uid);
        userGet(credential.user).then((response) => {
          console.log('GET_USER_INFO_API', response.data.user);
          setUserInfo(response.data.user);
        });
      }
    });
    return credentials;
  };

  useEffect(() => {
    GetUrls();
    dispatch(fetchGoogleKey());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <SafeAreaView style={styles.mainView}>
      <>
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
                Prijava
              </Heading>
            </View>
            <Center flex={1} justifyContent="space-between" w="100%">
              <Box flex={1} safeArea marginTop={4} w="80%">
                <VStack flex={0.5}>
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
                      keyboardType="email-address"
                      color="black"
                      onChangeText={(value) => setEmail(value)}
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
                </VStack>
                <VStack flex={0.4}>
                  <Center marginY={5}>
                    <TouchableOpacity style={styles.button} onPress={LoginUser}>
                      <Text style={styles.buttonText}>Prijavi se</Text>
                    </TouchableOpacity>
                    <HStack marginY={5}>
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
                  <Text>?? 2022 Bookingster - Sva prava pridr??ana.</Text>
                </HStack>
              </Box>
            </Center>
          </View>
        </KeyboardAvoidingView>
      </>
    </SafeAreaView>
  );
}

Login.propTypes = {
  setUserInfo: PropTypes.func.isRequired,
  setIsNewUser: PropTypes.func.isRequired,
};

export default Login;
