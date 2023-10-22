import React from 'react';

import { createNativeStackNavigator } from '@react-navigation/native-stack';

import useAuth from '@/context/auth/hooks/useAuth';
import { NO_HEADER_SCREEN_OPTIONS, WITH_HEADER_SCREEN_OPTIONS } from '@/models/router/constants';
import { RootStackParamList } from '@/models/router/types';

import EditorScreen from './EditorScreen';
import HomeScreen from './HomeScreen';
import LoginScreen from './LoginScreen';

const Stack = createNativeStackNavigator<RootStackParamList>();

const MainRoutes = () => {
  const { authenticated } = useAuth();
  return (
    <Stack.Navigator>
      {!authenticated && (
        <>
          <Stack.Group screenOptions={NO_HEADER_SCREEN_OPTIONS}>
            <Stack.Screen name="LoginScreen" component={LoginScreen} />
          </Stack.Group>
        </>
      )}
      {authenticated && (
        <>
          <Stack.Group screenOptions={NO_HEADER_SCREEN_OPTIONS}>
            <Stack.Screen name="HomeScreen" component={HomeScreen} />
          </Stack.Group>
          <Stack.Group screenOptions={WITH_HEADER_SCREEN_OPTIONS}>
            <Stack.Screen options={{ title: 'Create Note' }} name="EditorScreen" component={EditorScreen} />
          </Stack.Group>
        </>
      )}
    </Stack.Navigator>
  );
};

export default MainRoutes;
