import React, { PropsWithChildren, useCallback, useRef, useState } from 'react';
import { MMKV } from 'react-native-mmkv';

import AuthContext from './index';

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
