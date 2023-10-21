import { createContext } from 'react';

import type { AuthContextType } from './model/types';

const AuthContext = createContext<AuthContextType>({
  authenticated: false,
  passwordAuthenticate: () => {},
});

export default AuthContext;
