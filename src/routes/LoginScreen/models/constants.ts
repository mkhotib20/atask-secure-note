import { BIOMETRY_TYPE } from 'react-native-keychain';

export const LS_KEY_PWD = 'PASSWORD';
// Minimum 8 char, uppercase, lowercase, number
export const STRONG_PASSWORD_REGEX = /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d).{8,}$/;

export const BIOMETRY_ICON: Record<BIOMETRY_TYPE, string> = {
  Face: 'face-recognition',
  FaceID: 'face-recognition',
  Fingerprint: 'fingerprint',
  Iris: 'face-recognition',
  TouchID: 'fingerprint',
};
