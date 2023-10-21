import React from 'react';
import { KeyboardAvoidingView, Platform, View } from 'react-native';
import { TextInput } from 'react-native-paper';

import { styles } from './styles';
import usePasswordLogin from './usecase/useLogin';

const LoginScreen = () => {
  const { handleLogin } = usePasswordLogin();
  return (
    <KeyboardAvoidingView behavior={Platform.select({ ios: 'padding', android: 'height' })}>
      <View style={styles.passwordWrapper}>
        <TextInput
          onSubmitEditing={(e) => handleLogin(e.nativeEvent.text)}
          secureTextEntry
          style={{ width: '100%' }}
          mode="outlined"
          placeholder="Input Password"
          autoFocus
        />
      </View>
    </KeyboardAvoidingView>
  );
};

export default LoginScreen;
