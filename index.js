import 'react-native-gesture-handler';
import {AppRegistry} from 'react-native';
import App from './src/App';
import React from 'react';
import {Provider} from 'react-redux';
import store from './src/store/index';
import {name as appName} from './app.json';

const Root = () => (
  <Provider store={store}>
    <App />
  </Provider>
);

AppRegistry.registerComponent(appName, () => Root);
