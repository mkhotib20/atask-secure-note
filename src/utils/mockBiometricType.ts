import { BIOMETRY_TYPE } from 'react-native-keychain';

/**
 * For testing purpose
 */
const mockBiometricType = async (): Promise<null | BIOMETRY_TYPE> => {
  return Promise.resolve(BIOMETRY_TYPE.FINGERPRINT);
};

export default mockBiometricType;
