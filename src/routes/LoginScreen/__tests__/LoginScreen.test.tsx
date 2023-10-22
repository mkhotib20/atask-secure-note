import React from 'react';
import 'react-native';
import { Alert } from 'react-native';
import * as keychain from 'react-native-keychain';
import { act } from 'react-test-renderer';

import '@testing-library/jest-native/extend-expect';
import { fireEvent, render, screen, waitFor } from '@testing-library/react-native';

import App from '@/App';
import { BCRYPTED_PASSWORD } from '@/__mock_data__/pwd';
import mockBiometricType from '@/utils/mockBiometricType';

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

  it('should show password if press eye icon', async () => {
    render(<App />);
    const eyeOpenBtn = await screen.findByTestId('eyeOpen');
    fireEvent(eyeOpenBtn, 'press');
    expect(await screen.findByPlaceholderText('Input Password')).toHaveProp('secureTextEntry', false);

    const eyeCloseBtn = await screen.findByTestId('eyeClose');
    expect(eyeCloseBtn).toBeOnTheScreen();
    fireEvent(eyeCloseBtn, 'press');
    expect(await screen.findByTestId('eyeOpen')).toBeOnTheScreen();

    expect(await screen.findByPlaceholderText('Input Password')).toHaveProp('secureTextEntry', true);
  });

  it('should render correctly new user and store the password', async () => {
    const mockGetGenericPwd = jest.spyOn(keychain, 'getGenericPassword');
    mockGetGenericPwd.mockImplementation(async () => {
      return false;
    });

    await setupAndSimulateInput('October2023');
    expect(screen.queryByText('Create New')).toBeDefined();
  });

  it('should render correctly and user login with correct password', async () => {
    await setupAndSimulateInput('October2023');
    expect(screen.queryByText('Create New')).toBeDefined();
  });

  it('should show password not strong for weak password', async () => {
    await setupAndSimulateInput('weak');
    expect(await screen.findByText('Password is not strong enough')).toBeDefined();
  });

  it('Should show alert if user input wrong password', async () => {
    await setupAndSimulateInput('WrongPassword2023');

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

    await setupAndSimulateInput('October2023');

    await waitFor(() => {
      expect(Alert.alert).toHaveBeenCalledWith('Internal Error', 'Oops, something went wrong. Please try again later');
    });
  });

  it('Should show biometrics if deifned and logged in without password', async () => {
    const mockGetSupportedBiometryType = jest.spyOn(keychain, 'getSupportedBiometryType');
    mockGetSupportedBiometryType.mockImplementation(mockBiometricType);
    render(<App />);

    expect(screen.queryByText('Create New')).toBeDefined();
  });

  it('should render correctly new user and store the password, and setup the biometrics auth', async () => {
    const mockGetGenericPwd = jest.spyOn(keychain, 'getGenericPassword');
    mockGetGenericPwd.mockImplementation(async () => {
      return false;
    });

    const mockGetSupportedBiometryType = jest.spyOn(keychain, 'getSupportedBiometryType');
    mockGetSupportedBiometryType.mockImplementation(mockBiometricType);

    await setupAndSimulateInput('October2023');
    expect(screen.queryByText('Create New')).toBeDefined();
  });
});
