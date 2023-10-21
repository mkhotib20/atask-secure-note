import { useCallback, useEffect, useState } from 'react';
import { Alert } from 'react-native';
import bcrypt from 'react-native-bcrypt';
import {
  ACCESSIBLE,
  ACCESS_CONTROL,
  AUTHENTICATION_TYPE,
  STORAGE_TYPE,
  getGenericPassword,
  getSupportedBiometryType,
  setGenericPassword,
} from 'react-native-keychain';
import uuid from 'react-native-uuid';

import useAuth from '@/context/auth/hooks/useAuth';

const usePasswordLogin = () => {
  const { attemptLogin } = useAuth();
  const [loading, setLoading] = useState(false);

  const handleNewUser = async (password: string) => {
    // Generate UUID for user unique encryption key
    const username = uuid.v4().toString();
    const hashedPassword = bcrypt.hashSync(password, 10);
    // Store to RSA for biometric
    await setGenericPassword(username, hashedPassword, {
      storage: STORAGE_TYPE.RSA,
      service: 'biometric',
    });
    // Store to KeyChain for plain text password
    await setGenericPassword(username, hashedPassword, {
      storage: STORAGE_TYPE.KC,
      service: 'password',
    });
    attemptLogin(username);
  };

  const handleLogin = async (rawPassword: string) => {
    setLoading(true);
    try {
      const passwordRetrieved = await getGenericPassword({
        service: 'password',
        storage: STORAGE_TYPE.KC,
      });

      // if no password retrieved at the first open, set password to keychain

      if (!passwordRetrieved) {
        return handleNewUser(rawPassword);
      }
      const { password, username } = passwordRetrieved;

      const isPasswordMatch = bcrypt.compareSync(rawPassword, password);

      if (!isPasswordMatch) {
        Alert.alert('Auth Failed', "Password doesn't match!!");
        return;
      }

      attemptLogin(username);
    } catch (error) {
      console.error(error);
      Alert.alert('Internal Error', 'Oops, something went wrong. Please try again later');
    } finally {
      setLoading(false);
    }
  };

  const authenticateBiometric = useCallback(async () => {
    const biometricResult = await getSupportedBiometryType();

    if (!biometricResult) {
      return;
    }

    try {
      const credential = await getGenericPassword({
        accessControl: ACCESS_CONTROL.BIOMETRY_ANY,
        authenticationPrompt: {
          title: 'Login',
          description: 'Login to secret note',
        },
        authenticationType: AUTHENTICATION_TYPE.BIOMETRICS,
        accessible: ACCESSIBLE.ALWAYS,
        service: 'biometric',
      });

      if (!credential) {
        return;
      }

      const { username } = credential;

      // Means user has been verified and no need to input username
      attemptLogin(username);
    } catch (error) {
      // do nothing
    }
  }, [attemptLogin]);

  useEffect(() => {
    authenticateBiometric();
  }, [authenticateBiometric]);

  return { handleLogin, loading };
};

export default usePasswordLogin;
