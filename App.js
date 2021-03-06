import 'react-native-gesture-handler';
import React from 'react';
import { LogBox } from 'react-native';
import { NativeBaseProvider, StatusBar } from 'native-base';
import { Provider } from 'react-redux';
import { NavigationContainer } from '@react-navigation/native';
import store from './src/redux/store';
import MainNavigator from './src/navigator/MainNavigator';
import EstablishmentRegistrationForm from './src/components/ugostiteljForm/EstablishmentRegistrationForm';
import EstablishmentOwnerTabNavigator from './src/navigator/EstablishmentOwnerTabNavigator';
import { primary } from './src/assets/getColors';

function App() {
  LogBox.ignoreAllLogs();
  console.log('test');
  return (
    <Provider store={store}>
      <NavigationContainer>
        <NativeBaseProvider>
          <StatusBar backgroundColor={primary} />
          <MainNavigator />
          {/* <EstablishmentRegistrationForm /> */}
          {/* <EstablishmentOwnerTabNavigator /> */}
        </NativeBaseProvider>
      </NavigationContainer>
    </Provider>
  );
}

export default App;
