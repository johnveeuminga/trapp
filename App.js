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
const RootNavigator = createAppContainer(HomeNavigator)

const App = () => (
  <RootNavigator />
);

export default App;
