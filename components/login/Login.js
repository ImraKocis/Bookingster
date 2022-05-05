import {
  Image,
  SafeAreaView,
  Text,
  TextInput,
  View,
  TouchableOpacity,
  KeyboardAvoidingView,
} from 'react-native';
import React from 'react';
import {loginStyle} from './loginStyle';

const styles = loginStyle;

export default function Login() {
  return (
    <SafeAreaView style={styles.mainView}>
      <View style={styles.imageContainer}>
        <View style={styles.imageVeiw}>
          <Image
            style={styles.image}
            source={require('../img/undraw_Forms_re_pkrt.png')}></Image>
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
              style={styles.email}
              underlineColorAndroid="black"
              placeholder="Emial"></TextInput>
            <TextInput
              style={styles.password}
              underlineColorAndroid="black"
              placeholder="Password"
              secureTextEntry={true}></TextInput>
          </View>

          <View style={styles.buttonVeiw}>
            <TouchableOpacity style={styles.button}>
              <Text style={styles.buttonText}>Prijavi se</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.signWithView}>
            <Text style={styles.signWithText}>ili se prijavite sa</Text>
          </View>
          <View style={styles.goolgeButtonView}>
            <TouchableOpacity style={styles.googleButton}>
              <Image
                style={styles.googleImage}
                source={require('../img/google.png')}></Image>
            </TouchableOpacity>
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
}
