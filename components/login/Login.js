import {
  Image,
  SafeAreaView,
  Text,
  TextInput,
  View,
  TouchableOpacity,
  KeyboardAvoidingView,
} from 'react-native';
import React, {useState, useEffect} from 'react';
import {loginStyle} from './loginStyle';
import storage from '@react-native-firebase/storage';
import auth from '@react-native-firebase/auth';
import {GoogleSignin} from '@react-native-google-signin/google-signin';

GoogleSignin.configure({
  webClientId: 'x',
});
const styles = loginStyle;

export default function Login() {
  const [SignUpUrl, setSignUpUrl] = useState('');
  const [GoogleUrl, setGooglepUrl] = useState('');
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [initializing, setInitializing] = useState(true);
  const [user, setUser] = useState();

  const onAuthStateChanged = user => {
    setUser(user);
    if (initializing) setInitializing(false);
  };

  const LoadImages = async () => {
    setSignUpUrl(await storage().ref('SignIn.png').getDownloadURL());
    setGooglepUrl(await storage().ref('GoogleLogo.png').getDownloadURL());
  };

  const LoginUser = () => {
    auth()
      .signInWithEmailAndPassword(email, password)
      .then(() => {
        console.log('Logiran');
      })
      .catch(error => console.log(error));
  };

  const LogoutUser = () => {
    auth().signOut();
  };

  const onGoogleButtonPress = async () => {
    const {idToken} = await GoogleSignin.signIn();
    const googleCredential = auth.GoogleAuthProvider.credential(idToken);
    return auth().signInWithCredential(googleCredential);
  };

  useEffect(() => {
    LoadImages();
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
                <Text style={styles.header}>Prijava</Text>
              </View>
              <View style={styles.formView}>
                <TextInput
                  onChangeText={value => setEmail(value)}
                  style={styles.email}
                  underlineColorAndroid="black"
                  placeholder="Emial"></TextInput>
                <TextInput
                  onChangeText={value => setPassword(value)}
                  style={styles.password}
                  underlineColorAndroid="black"
                  placeholder="Password"
                  secureTextEntry={true}></TextInput>
              </View>

              <View style={styles.buttonVeiw}>
                <TouchableOpacity style={styles.button} onPress={LoginUser}>
                  <Text style={styles.buttonText}>Prijavi se</Text>
                </TouchableOpacity>
              </View>
              <View style={styles.signWithView}>
                <Text style={styles.signWithText}>ili se prijavite sa</Text>
              </View>
              <View style={styles.goolgeButtonView}>
                <TouchableOpacity
                  onPress={onGoogleButtonPress}
                  style={styles.googleButton}>
                  <Image
                    style={styles.googleImage}
                    source={{uri: GoogleUrl}}></Image>
                </TouchableOpacity>
              </View>
              <View style={styles.footerView}>
                <Text style={styles.footerText}>
                  © 2022 Bookingster - Sva prava pridržana.
                </Text>
              </View>
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
