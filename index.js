import React from 'react';
import { AppRegistry } from 'react-native';
import { name as appName } from './app.json';
import App from './App';

import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import rootReducer from './src/services/rootReducer';

export const ROOTSTORE = createStore(
  rootReducer,
  undefined,
  applyMiddleware(thunk),
);

const RootApp = () => (
  <Provider store={ROOTSTORE}>
    <App />
  </Provider>
);

AppRegistry.registerComponent(appName, () => RootApp);
