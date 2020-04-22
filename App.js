import React from 'react';
import { NavigationContainer } from '@react-navigation/native';

import AuthProvider from "./Providers/Auth";
import MainTab from './AppNavigator'

export default function App() {
  return (
    <AuthProvider>
      <NavigationContainer>
        <MainTab />
      </NavigationContainer>
    </AuthProvider>
  );
}
