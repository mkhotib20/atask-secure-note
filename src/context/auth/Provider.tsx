import React, { PropsWithChildren, useCallback, useEffect, useRef, useState } from 'react';
import { Alert } from 'react-native';
import ReactNativeBiometrics from 'react-native-biometrics';
import { MMKV } from 'react-native-mmkv';

import AuthContext from './index';
import { MESSAGE_BASEDON_ERROR } from './model/constants';

const rnBiometrics = new ReactNativeBiometrics({});

const AuthProvider = ({ children }: PropsWithChildren<unknown>) => {
  const [authenticated, setAuthenticated] = useState(false);
  const mmkvInstance = useRef<MMKV>();

  const constructMmkv = useCallback((encryptionKey: string) => {
    const instance = new MMKV({
      encryptionKey,
      id: 'notes',
    });

    mmkvInstance.current = instance;
    setAuthenticated(true);
  }, []);

  const authenticate = useCallback(async () => {
    const { error } = await rnBiometrics.isSensorAvailable();
    console.log(error);

    if (error) {
      Alert.alert('Biometric Error', MESSAGE_BASEDON_ERROR[error]);
      return;
    }

    try {
      const { signature, error } = await rnBiometrics.createSignature({
        payload: 'user-id',
        promptMessage: 'Login to use note!',
      });
      if (!signature || error) {
        return;
      }
      constructMmkv(signature);
    } catch (error) {
      console.error(error);
    }
  }, [constructMmkv]);

  useEffect(() => {
    authenticate();
  }, [authenticate]);

  const passwordAuthenticate = useCallback(
    (password: string) => {
      constructMmkv(password);
    },
    [constructMmkv],
  );

  return (
    <AuthContext.Provider value={{ passwordAuthenticate, authenticated, mmkvInstance: mmkvInstance.current }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
