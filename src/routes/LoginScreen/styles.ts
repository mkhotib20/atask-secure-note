import { StyleSheet } from 'react-native';

import { DEFAULT_WHITE } from '@/styles/colors';

const styles = StyleSheet.create({
  passwordWrapper: {
    backgroundColor: DEFAULT_WHITE,
    padding: 20,
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
  },
  loginButton: {
    flex: 1,
    borderRadius: 8,
  },
  biometricBtn: {
    borderRadius: 8,
    marginLeft: 8,
  },
});

export default styles;
