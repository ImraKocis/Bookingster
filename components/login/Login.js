import {
  Image,
  SafeAreaView,
  TextInput,
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
import React, {useState, useEffect} from 'react';
import IconVector from 'react-native-vector-icons/MaterialIcons';

import {loginStyle} from './loginStyle';
import auth from '@react-native-firebase/auth';
import {
  GoogleSignin,
  GoogleSigninButton,
} from '@react-native-google-signin/google-signin';
import {LoadSignInImg, LoadGoogleImg} from '../../assets/getImages';

GoogleSignin.configure({
  webClientId: 'x',
});
const styles = loginStyle;

export default function Login() {
  const [SignUpUrl, setSignUpUrl] = useState('');
  const [GoogleUrl, setGoogleUrl] = useState('');
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [initializing, setInitializing] = useState(true);
  const [user, setUser] = useState();
  const [validationError, setValidationError] = useState({});

  const onAuthStateChanged = user => {
    setUser(user);
    if (initializing) setInitializing(false);
  };
  const GetUrls = async () => {
    setSignUpUrl(await LoadSignInImg());
    setGoogleUrl(await LoadGoogleImg());
  };

  const LoginUser = () => {
    var errors = {};
    if (!email) errors.email = 'Email je obavezan';
    if (!password) errors.password = 'Lozinka je obavezna';
    if (email && password) {
      auth()
        .signInWithEmailAndPassword(email, password)
        .then(() => {
          console.log('Logiran');
        })
        .catch(error => {
          if (error.code === 'auth/invalid-email')
            errors.email = 'Neispravan email';
          if (error.code === 'auth/invalid-password')
            errors.password = 'Naispravna lozinka';
          console.log(error);
        });
    }
    setValidationError(errors);
  };

  const LogoutUser = () => {
    auth().signOut();
  };

  const onGoogleButtonPress = async () => {
    const {idToken} = await GoogleSignin.signIn();
    const googleCredential = auth.GoogleAuthProvider.credential(idToken);

    const credentials = auth().signInWithCredential(googleCredential);
    credentials.then(credential => {
      console.log(credential.additionalUserInfo.isNewUser);
    });
    return credentials;
  };

  useEffect(() => {
    GetUrls();
    const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
    return subscriber;
  }, []);

  if (initializing) return null;
  return (
    <SafeAreaView style={styles.mainView}>
      {!user ? (
        <>
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
                <Heading
                  size="xl"
                  fontWeight="600"
                  color="coolGray.800"
                  _dark={{
                    color: 'warmGray.50',
                  }}>
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
                  </VStack>
                  <VStack flex={0.4}>
                    <Center marginY={5}>
                      <TouchableOpacity
                        style={styles.button}
                        onPress={LoginUser}>
                        <Text style={styles.buttonText}>Prijavi se</Text>
                      </TouchableOpacity>
                      <HStack marginY={5}>
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
        </>
      ) : (
        <View
          style={{
            flex: 1,
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
          }}>
          {console.log(user)}
          <Text style={{textAlign: 'center', marginBottom: 15}}>
            {user.email}
          </Text>
          <TouchableOpacity onPress={LogoutUser} style={styles.button}>
            <Text style={styles.buttonText}>Odjava</Text>
          </TouchableOpacity>
        </View>
      )}
    </SafeAreaView>
  );
}
