/**
 * @format
 */

import {AppRegistry, LogBox} from 'react-native';
import App from './App';
import {name as appName} from './app.json';
import {persistor, store} from './src/store/index';
import {Provider} from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import Toast from 'react-native-toast-message';

LogBox.ignoreAllLogs();

const createApp = () => (
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <App />
      <Toast />
    </PersistGate>
  </Provider>
);

AppRegistry.registerComponent(appName, () => createApp);
