/**
 * @format
 */
import 'react-native';
import { Alert } from 'react-native';
import * as keychain from 'react-native-keychain';
import { act } from 'react-test-renderer';

import '@testing-library/jest-native/extend-expect';
import { fireEvent, render, screen, waitFor } from '@testing-library/react-native';

import App from '@/App';

jest.mock('react-native-keychain');

const BCRYPTED_PASSWORD = '$2a$10$/4.eCjFNDEegZU1dZtbJ4usg4d6XXK6c.dunPd/0wG5VBDb9o2jOK';

const setupAndSimulateInput = async (userInput: string) => {
  render(<App />);

  const passwordInput = await screen.findByPlaceholderText('Input Password');
  expect(passwordInput).toBeOnTheScreen();

  act(() => {
    fireEvent(passwordInput, 'changeText', userInput);
  });

  const loginBtn = await screen.findByText('Login');
  expect(loginBtn).toBeDefined();
  act(() => {
    fireEvent(loginBtn, 'press');
  });
};

describe('Login Screen Test', () => {
  beforeEach(() => {
    jest.spyOn(Alert, 'alert');
    const getGenericPasswordMock = jest.spyOn(keychain, 'getGenericPassword');

    getGenericPasswordMock.mockImplementation(async () => ({
      password: BCRYPTED_PASSWORD,
      service: 'test',
      storage: keychain.STORAGE_TYPE.KC,
      username: '444',
    }));
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should render correctly and user login with correct password', async () => {
    await setupAndSimulateInput('123');
    expect(screen.queryByText('Create New')).toBeDefined();
  });

  it('Should show alert if user input wrong password', async () => {
    await setupAndSimulateInput('312123213');

    await waitFor(() => {
      expect(Alert.alert).toHaveBeenCalledWith('Auth Failed', "Password doesn't match!!");
    });

    expect(screen.queryByText('Create New')).toBeNull();
  });

  it('Should show alert if getGenericPassword throw error', async () => {
    const mockGetGenericPwd = jest.spyOn(keychain, 'getGenericPassword');
    mockGetGenericPwd.mockImplementation(async () => {
      return Promise.reject(new Error('Mock Error'));
    });

    await setupAndSimulateInput('312123213');

    await waitFor(() => {
      expect(Alert.alert).toHaveBeenCalledWith('Internal Error', 'Oops, something went wrong. Please try again later');
    });
  });

  it('Should show biometrics if deifned and logged in without password', async () => {
    const mockGetSupportedBiometryType = jest.spyOn(keychain, 'getSupportedBiometryType');
    mockGetSupportedBiometryType.mockImplementation(async () => {
      return keychain.BIOMETRY_TYPE.FINGERPRINT;
    });
    render(<App />);

    expect(screen.queryByText('Create New')).toBeDefined();
  });
});