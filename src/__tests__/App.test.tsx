import React from 'react';
import 'react-native';
import * as keychain from 'react-native-keychain';

import '@testing-library/jest-native/extend-expect';
import { render, screen } from '@testing-library/react-native';

import App from '@/App';

jest.mock('react-native-keychain');

describe('App Test', () => {
  it('should render correctly and show input password', async () => {
    const mockGetSupportedBiometryType = jest.spyOn(keychain, 'getSupportedBiometryType');
    mockGetSupportedBiometryType.mockImplementation(async () => {
      return keychain.BIOMETRY_TYPE.FACE_ID;
    });

    render(<App />);
    // Simulate user first login without having any stored password in keychains
    const passwordInput = await screen.findByPlaceholderText('Input Password');
    expect(passwordInput).toBeOnTheScreen();
  });
});
