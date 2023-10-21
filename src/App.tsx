import React from 'react';
import BootSplash from 'react-native-bootsplash';
import { PaperProvider } from 'react-native-paper';

import { NavigationContainer } from '@react-navigation/native';

import AuthProvider from './context/auth/Provider';
import MainRoutes from './routes';
import { PRIMARY_COLOR } from './styles/colors';

const MainApp = () => {
  return (
    <NavigationContainer
      onReady={() => {
        BootSplash.hide();
      }}
    >
      <PaperProvider
        theme={{
          colors: {
            primary: PRIMARY_COLOR,
            error: 'red',
          },
        }}
      >
        <AuthProvider>
          <MainRoutes />
        </AuthProvider>
      </PaperProvider>
    </NavigationContainer>
  );
};

export default MainApp;
