import React from 'react';
import { NavigationContainer } from '@react-navigation/native';

import MainTab from './AppNavigator'

export default function App() {
  return (
    <NavigationContainer>
      <MainTab />
    </NavigationContainer>
  );
}
