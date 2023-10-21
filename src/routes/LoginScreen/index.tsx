import React, { useState } from 'react';
import { KeyboardAvoidingView, Platform, View } from 'react-native';
import { Button, Text, TextInput } from 'react-native-paper';

import { DEFAULT_BLACK, DEFAULT_WHITE } from '@/styles/colors';

import { styles } from './styles';
import usePasswordLogin from './usecase/usePasswordLogin';

const LoginScreen = () => {
  const { handleLogin, loading } = usePasswordLogin();
  const [pwd, setPwd] = useState('');

  const handlePressLogin = () => {
    handleLogin(pwd);
  };

  return (
    <KeyboardAvoidingView behavior={Platform.select({ ios: 'padding', android: 'height' })}>
      <View style={styles.passwordWrapper}>
        <Text style={{ marginBottom: 20, color: DEFAULT_BLACK }}>Input password</Text>
        <TextInput
          disabled={loading}
          value={pwd}
          onChangeText={setPwd}
          onSubmitEditing={handlePressLogin}
          secureTextEntry
          style={{ width: '100%' }}
          textColor={DEFAULT_BLACK}
          mode="outlined"
          placeholder="Input Password"
        />
        <Button
          loading={loading}
          onPress={handlePressLogin}
          disabled={loading}
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
