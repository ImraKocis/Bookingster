import 'react-native-gesture-handler';
import React, { Suspense } from 'react';
import { NativeBaseProvider, Text } from 'native-base';
import { Provider } from 'react-redux';
import { NavigationContainer } from '@react-navigation/native';
import store from './src/redux/store';
import MainNavigator from './src/navigator/MainNavigator';
import EstablishmentRegistrationForm from './src/components/ugostiteljForm/EstablishmentRegistrationForm';

function App() {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <NativeBaseProvider>
          <Suspense fallback={<Text>Loading</Text>}>
            <MainNavigator />
          </Suspense>
          {/* <EstablishmentRegistrationForm /> */}
        </NativeBaseProvider>
      </NavigationContainer>
    </Provider>
  );
}

export default App;
