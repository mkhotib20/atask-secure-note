import React, { PropsWithChildren, useCallback, useEffect, useRef, useState } from 'react';
import { AppState } from 'react-native';
import { MMKV } from 'react-native-mmkv';

import AuthContext from './index';

const AuthProvider = ({ children }: PropsWithChildren<unknown>) => {
  const [authenticated, setAuthenticated] = useState(false);
  const appState = useRef(AppState.currentState);
  const mmkvInstance = useRef<MMKV>();

  const constructMmkv = useCallback((encryptionKey: string) => {
    const instance = new MMKV({
      id: 'secret-notes',
      encryptionKey,
    });

    mmkvInstance.current = instance;
    setAuthenticated(true);
  }, []);

  const attemptLogin = useCallback(
    (userID: string) => {
      constructMmkv(userID);
    },
    [constructMmkv],
  );

  useEffect(() => {
    const subscription = AppState.addEventListener('change', (nextAppState) => {
      const isGotoBackground = appState.current === 'active' && nextAppState.match(/inactive|background/);

      if (!isGotoBackground) {
        return;
      }

      // Relogin on minimize
      setAuthenticated(false);
    });

    return () => {
      subscription.remove();
    };
  }, []);

  return (
    <AuthContext.Provider value={{ attemptLogin, authenticated, mmkvInstance: mmkvInstance.current }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
