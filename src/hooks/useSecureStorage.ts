import { useCallback } from 'react';

import useAuth from '@/context/auth/hooks/useAuth';

const useSecureStorage = () => {
  const { mmkvInstance } = useAuth();

  const set = useCallback(
    (key: string, value: string) => {
      mmkvInstance?.set(key, value);
    },
    [mmkvInstance],
  );

  const get = useCallback(
    (key: string): string | undefined => {
      return mmkvInstance?.getString(key);
    },
    [mmkvInstance],
  );

  return { set, get };
};

export default useSecureStorage;
