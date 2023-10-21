import { Alert } from 'react-native';

import useAuth from '@/context/auth/hooks/useAuth';
import localStorage from '@/utils/localStorage';

import { LS_KEY_PWD } from '../models/constants';

const usePasswordLogin = () => {
  const { passwordAuthenticate } = useAuth();

  const handleLogin = (password: string) => {
    const exist = localStorage.getString(LS_KEY_PWD);

    if (exist) {
      const isMatch = password === exist;
      if (!isMatch) {
        Alert.alert('Auth Failed', "Password doesn't match!!");
        // todo: error
        return;
      }
    } else {
      localStorage.set(LS_KEY_PWD, password);
    }

    passwordAuthenticate(password);
  };
  return { handleLogin };
};

export default usePasswordLogin;
