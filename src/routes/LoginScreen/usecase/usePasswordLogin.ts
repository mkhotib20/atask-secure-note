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

import useAuth from '@/context/auth/hooks/useAuth';

const usePasswordLogin = () => {
  const { passwordAuthenticate } = useAuth();
  const [loading, setLoading] = useState(false);

  const handleLogin = async (password: string) => {
    setLoading(true);
    try {
      const passwordRetrieved = await getGenericPassword({
        service: 'password',
        storage: STORAGE_TYPE.KC,
      });

      console.log(passwordRetrieved);

      // if no password retrieved at the first open, set password to keychain

      if (!passwordRetrieved) {
        const hashedPassword = bcrypt.hashSync(password, 10);
        // Store to RSA for biometric
        await setGenericPassword('secret-note', hashedPassword, {
          storage: STORAGE_TYPE.RSA,
          service: 'biometric',
        });
        // Store to KeyChain for plain text password
        await setGenericPassword('secret-note', hashedPassword, {
          storage: STORAGE_TYPE.KC,
          service: 'password',
        });
        passwordAuthenticate(hashedPassword);
      } else {
        if (!bcrypt.compareSync(password, passwordRetrieved.password)) {
          Alert.alert('Auth Failed', "Password doesn't match!!");
          return;
        }
        passwordAuthenticate(passwordRetrieved.password);
      }
    } catch (error) {
      console.error(error);
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
      const { password } = credential;

      // Means user has been verified and no need to input password
      passwordAuthenticate(password);
    } catch (error) {
      // do nothing
    }
  }, [passwordAuthenticate]);

  useEffect(() => {
    authenticateBiometric();
  }, [authenticateBiometric]);

  return { handleLogin, loading };
};

export default usePasswordLogin;
