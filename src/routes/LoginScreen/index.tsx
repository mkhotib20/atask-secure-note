import React, { useMemo, useState } from 'react';
import { Alert, Image, KeyboardAvoidingView, Platform, View } from 'react-native';
import { Button, Text } from 'react-native-paper';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

import { DEFAULT_BLACK, DEFAULT_WHITE } from '@/styles/colors';

import { STRONG_PASSWORD_REGEX } from './models/constants';
import PasswordInput from './preentation/PasswordInput';
import styles from './styles';
import usePasswordLogin from './usecase/usePasswordLogin';

const LoginScreen = () => {
  const { handleLogin, loading, biometryType, authenticateBiometric } = usePasswordLogin();

  const [pwd, setPwd] = useState('');

  const handlePressLogin = () => {
    if (!pwd) {
      Alert.alert('Please input password');
      return;
    }
    handleLogin(pwd);
  };

  const isPasswordStrong = useMemo(() => !pwd || STRONG_PASSWORD_REGEX.test(pwd), [pwd]);

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
        <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 32 }}>
          <Button
            loading={loading}
            onPress={handlePressLogin}
            textColor={DEFAULT_WHITE}
            mode="contained"
            style={styles.loginButton}
            contentStyle={{ height: 48 }}
          >
            Login
          </Button>

          {biometryType && (
            <Button onPress={authenticateBiometric} mode="text" style={styles.biometricBtn}>
              <MaterialCommunityIcons size={20} name="face-recognition" />
            </Button>
          )}
        </View>
      </View>
    </KeyboardAvoidingView>
  );
};

export default LoginScreen;
