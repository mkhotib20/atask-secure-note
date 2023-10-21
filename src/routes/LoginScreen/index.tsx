import React, { useState } from 'react';
import { Image, KeyboardAvoidingView, Platform, View } from 'react-native';
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
        <Image style={{ width: 200, resizeMode: 'contain' }} source={require('@/assets/logoipsum.png')} />
        <Text style={{ marginBottom: 32, color: DEFAULT_BLACK }}>Welcome to Secret Note</Text>
        <TextInput
          disabled={loading}
          value={pwd}
          onChangeText={setPwd}
          onSubmitEditing={handlePressLogin}
          secureTextEntry
          style={{ width: '100%' }}
          mode="outlined"
          textColor={DEFAULT_BLACK}
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
