import { MMKV } from 'react-native-mmkv';

export interface AuthContextType {
  mmkvInstance?: MMKV;
  authenticated: boolean;
  passwordAuthenticate: (password: string) => void;
}
