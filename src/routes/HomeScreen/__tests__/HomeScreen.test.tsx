import React from 'react';
import 'react-native';
import { Alert } from 'react-native';
import * as keychain from 'react-native-keychain';
import { act } from 'react-test-renderer';

import '@testing-library/jest-native/extend-expect';
import { fireEvent, render, screen } from '@testing-library/react-native';

import App from '@/App';
import { BCRYPTED_PASSWORD } from '@/__mock_data__/pwd';

jest.mock('react-native-keychain');

const renderApp = () => {
  // make all test case encapsulated

  render(<App />);
};

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
    const alertSpy = jest.spyOn(Alert, 'alert');

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

    const titleEditInput = await screen.findByPlaceholderText('Title');
    expect(titleEditInput).toBeOnTheScreen();

    fireEvent(titleEditInput, 'changeText', 'I edit this note');

    const updateSaveBtn = await screen.findByTestId('saveButton');
    expect(updateSaveBtn).toBeOnTheScreen();
    fireEvent(updateSaveBtn, 'press');

    const myUpdatedNoteListed = await screen.findByText('I edit this note');
    expect(myUpdatedNoteListed).toBeOnTheScreen();

    fireEvent(myUpdatedNoteListed, 'press');

    const buttonToDelete = await screen.findByTestId('deleteButton');

    act(() => {
      fireEvent(buttonToDelete, 'press');
    });
    const [currentCall] = alertSpy.mock.calls;
    // Show prompt before delete
    expect(currentCall[1]).toBe('Are you sure want to delete this note?');
    const [_cancelBtn, okBtn] = currentCall[2] || [];
    if (typeof okBtn?.onPress === 'function') {
      okBtn.onPress();
    }

    const homescreenCreateNewAfterDelete = await screen.findByText('Create New');
    expect(homescreenCreateNewAfterDelete).toBeOnTheScreen();
  });
});
