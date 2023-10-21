import React, { useMemo, useState } from 'react';
import { Image, KeyboardAvoidingView, Platform, View } from 'react-native';
import { Button, Text } from 'react-native-paper';

import { DEFAULT_BLACK, DEFAULT_WHITE } from '@/styles/colors';

import { STRONG_PASSWORD_REGEX } from './models/constants';
import PasswordInput from './preentation/PasswordInput';
import { styles } from './styles';
import usePasswordLogin from './usecase/usePasswordLogin';

const LoginScreen = () => {
  const { handleLogin, loading } = usePasswordLogin();
  const [pwd, setPwd] = useState('');

  const handlePressLogin = () => {
    handleLogin(pwd);
  };

  const isPasswordStrong = useMemo(() => !pwd || STRONG_PASSWORD_REGEX.test(pwd), [pwd]);
  const isBtnEnabled = isPasswordStrong && pwd;

  return (
    <KeyboardAvoidingView behavior={Platform.select({ ios: 'padding', android: 'height' })}>
      <View style={styles.passwordWrapper}>
        <Image style={{ width: 200, resizeMode: 'contain' }} source={require('@/assets/logoipsum.png')} />
        <Text style={{ marginBottom: 32, color: DEFAULT_BLACK }}>Welcome to Secret Note</Text>
        <PasswordInput
          handlePressLogin={handlePressLogin}
          loading={loading}
          isPasswordStrong={isPasswordStrong}
          pwd={pwd}
          setPwd={setPwd}
        />
        <Button
          loading={loading}
          onPress={handlePressLogin}
          disabled={loading || !isBtnEnabled}
          textColor={DEFAULT_WHITE}
          mode="contained"
          style={{ marginTop: 32, width: '100%' }}
        >
          Login
        </Button>
      </View>
    </KeyboardAvoidingView>
  );
};

export default LoginScreen;
