import 'react-native-gesture-handler';
import React from 'react';

import {NativeBaseProvider} from 'native-base';

import store from './src/redux/store';
import {Provider} from 'react-redux';
import MainNavigator from './src/navigator/MainNavigator';
const App = () => {
  return (
    <Provider store={store}>
      <NativeBaseProvider>
        <MainNavigator />
      </NativeBaseProvider>
    </Provider>
  );
};

export default App;
