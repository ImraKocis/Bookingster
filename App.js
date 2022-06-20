import 'react-native-gesture-handler';
import React from 'react';

import store from './src/redux/store';
import {Provider} from 'react-redux';
import MainNavigator from './src/navigator/MainNavigator';
import Hint from './src/components/ugostiteljForm/hint/Hint';
import EstablishmentRegistrationForm from './src/components/ugostiteljForm/EstablishmentRegistrationForm';
import {NativeBaseProvider} from 'native-base';

const App = () => {
  return (
    <Provider store={store}>
      {/* <MainNavigator /> */}
      <NativeBaseProvider>
        <EstablishmentRegistrationForm />
      </NativeBaseProvider>
    </Provider>
  );
};

export default App;
