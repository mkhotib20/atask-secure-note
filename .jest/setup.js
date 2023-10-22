/**
 * Mock all generic behaviors
 */
const keychain = require('react-native-keychain');
const { Alert } = require('react-native');

jest.mock('react-native-keychain');

jest.useFakeTimers();

jest.mock('react-native-bootsplash', () => {
  return {
    __esModule: true,
    default: {
      hide: jest.fn().mockResolvedValueOnce(),
      show: jest.fn().mockResolvedValueOnce(),
      getVisibilityStatus: jest.fn().mockResolvedValue('hidden'),
    },
  };
});

jest.spyOn(Alert, 'alert');

const mockGetSupportedBiometryType = jest.spyOn(keychain, 'getSupportedBiometryType');
mockGetSupportedBiometryType.mockImplementation(() => {
  return Promise.resolve(null);
});
