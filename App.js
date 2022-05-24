import 'react-native-gesture-handler';
import React from 'react';

import {NativeBaseProvider} from 'native-base';
import Login from './components/login/Login';
import SignUp from './components/signup/SignUp';
import Welcome from './components/welcome/Welcome';
import Choice from './components/choice/Choice';
import Hint from './ugostiteljRegistration/Hint';
import WelcomeScreenNavigator from './navigator/WelcomeScreenNavigator';
import store from './redux/store';
import {Provider} from 'react-redux';
const App = () => {
  return (
    <Provider store={store}>
      <NativeBaseProvider>
        <WelcomeScreenNavigator />
      </NativeBaseProvider>
    </Provider>
  );
};

export default App;
