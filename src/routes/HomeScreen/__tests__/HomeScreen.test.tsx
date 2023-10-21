import React from 'react';
import 'react-native';
import * as keychain from 'react-native-keychain';
import { act } from 'react-test-renderer';

import '@testing-library/jest-native/extend-expect';
import { fireEvent, render, screen } from '@testing-library/react-native';

jest.mock('react-native-keychain');

const renderApp = () => {
  // make all test case encapsulated
  const App = require('@/App').default;
  render(<App />);
};
const BCRYPTED_PASSWORD = '$2a$10$/4.eCjFNDEegZU1dZtbJ4usg4d6XXK6c.dunPd/0wG5VBDb9o2jOK';
describe('Homescreen Test', () => {
  beforeEach(() => {
    const getGenericPasswordMock = jest.spyOn(keychain, 'getGenericPassword');

    getGenericPasswordMock.mockImplementation(async () => ({
      password: BCRYPTED_PASSWORD,
      service: 'test',
      storage: keychain.STORAGE_TYPE.KC,
      username: '444',
    }));
  });

  it('Create new notes with empty state and edit note if press note', async () => {
    // Always start from app, so that the context is included
    renderApp();

    const passwordInput = await screen.findByPlaceholderText('Input Password');
    expect(passwordInput).toBeOnTheScreen();

    fireEvent(passwordInput, 'changeText', '123');

    const loginBtn = await screen.findByText('Login');
    expect(loginBtn).toBeOnTheScreen();
    act(() => {
      fireEvent(loginBtn, 'press');
    });

    const homescreenCreateNew = await screen.findByText('Create New');
    expect(homescreenCreateNew).toBeOnTheScreen();

    act(() => {
      fireEvent(homescreenCreateNew, 'press');
    });

    const contentInput = await screen.findByPlaceholderText('Pour your thoughts');
    expect(contentInput).toBeOnTheScreen();

    fireEvent(contentInput, 'changeText', "Here's my first note");

    const titleInput = await screen.findByPlaceholderText('Title');
    expect(titleInput).toBeOnTheScreen();

    fireEvent(titleInput, 'changeText', 'My First Note');

    const saveBtn = await screen.findByTestId('saveButton');
    expect(saveBtn).toBeOnTheScreen();
    fireEvent(saveBtn, 'press');

    const myNoteListed = await screen.findByText('My First Note');
    expect(myNoteListed).toBeOnTheScreen();

    fireEvent(myNoteListed, 'press');

    const deleteButton = await screen.findByTestId('deleteButton');

    expect(deleteButton).toBeOnTheScreen();
  });
});
