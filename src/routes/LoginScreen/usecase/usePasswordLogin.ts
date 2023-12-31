import { useCallback, useEffect, useState } from 'react';
import { Alert } from 'react-native';
import bcrypt from 'react-native-bcrypt';
import {
  ACCESSIBLE,
  ACCESS_CONTROL,
  AUTHENTICATION_TYPE,
  BIOMETRY_TYPE,
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
  const [biometryType, setBiometryTypes] = useState<BIOMETRY_TYPE | null>(null);

  useEffect(() => {
    getSupportedBiometryType().then((result) => {
      setBiometryTypes(result);
    });
  }, []);

  const handleNewUser = async (password: string) => {
    // Generate UUID for user unique encryption key
    const username = uuid.v4().toString();
    const hashedPassword = bcrypt.hashSync(password, 10);
    // Store to RSA for biometric, only if user has biometric support
    if (biometryType) {
      await setGenericPassword(username, hashedPassword, {
        storage: STORAGE_TYPE.RSA,
        service: 'biometric',
      });
    }
    // Store to KeyChain for plain text password
    await setGenericPassword(username, hashedPassword, {
      service: 'password',
    });
    attemptLogin(username);
  };

  const handleLogin = async (rawPassword: string) => {
    setLoading(true);
    try {
      const passwordRetrieved = await getGenericPassword({
        service: 'password',
      });

      // if no password retrieved at the first open, set password to keychain

      if (!passwordRetrieved) {
        await handleNewUser(rawPassword);
        return;
      }
      const { password, username } = passwordRetrieved;

      const isPasswordMatch = bcrypt.compareSync(rawPassword, password);
      console.log(isPasswordMatch, 'dsadsaojasdoaosdjdas');

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
    if (!biometryType) {
      return;
    }
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
  }, [attemptLogin, biometryType]);

  useEffect(() => {
    authenticateBiometric();
  }, [authenticateBiometric]);

  return { biometryType, handleLogin, loading, authenticateBiometric };
};

export default usePasswordLogin;
