import React, { useState } from 'react';
import { HelperText, TextInput } from 'react-native-paper';

import { DEFAULT_BLACK, LIGHTER_BLACK, PRIMARY_COLOR } from '@/styles/colors';

import type { PasswordInputProps } from '../models/types';

const PasswordInput = ({ isPasswordStrong, loading, pwd, setPwd, handlePressLogin }: PasswordInputProps) => {
  const [passwordVisible, setPasswordVisible] = useState(false);

  return (
    <>
      <TextInput
        disabled={loading}
        error={!isPasswordStrong}
        value={pwd}
        onChangeText={setPwd}
        onSubmitEditing={handlePressLogin}
        secureTextEntry={!passwordVisible}
        outlineColor={PRIMARY_COLOR}
        style={{ width: '100%' }}
        mode="outlined"
        right={
          <TextInput.Icon
            testID={passwordVisible ? 'eyeClose' : 'eyeOpen'}
            onPress={() => setPasswordVisible((prev) => !prev)}
            color={LIGHTER_BLACK}
            icon={passwordVisible ? 'eye-off' : 'eye'}
          />
        }
        textColor={DEFAULT_BLACK}
        placeholder="Input Password"
      />
      {!isPasswordStrong && (
        <HelperText type="error" visible>
          Password is not strong enough
        </HelperText>
      )}
    </>
  );
};

export default PasswordInput;
