import { MMKV } from 'react-native-mmkv';

export interface AuthContextType {
  mmkvInstance?: MMKV;
  authenticated: boolean;
  attemptLogin: (userID: string) => void;
  encryptionKey?: string;
}
