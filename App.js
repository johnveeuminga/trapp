/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React from 'react';
import { createAppContainer } from 'react-navigation'
import HomeNavigator from './src/navigation/HomeNavigator';
import { Provider } from 'react-redux';
import { store } from './src/redux/store';
const RootNavigator = createAppContainer(HomeNavigator)

const App = () => (
  <Provider store={store}>
    <RootNavigator />
  </Provider>
);

export default App;
