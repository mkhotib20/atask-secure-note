import { StyleSheet } from 'react-native';

import { PRIMARY_COLOR } from '@/styles/colors';

export const styles = StyleSheet.create({
  fabStyle: {
    position: 'absolute',
    margin: 16,
    right: 0,
    bottom: 0,
    zIndex: 9,
    backgroundColor: PRIMARY_COLOR,
  },
  screenTitle: {
    fontSize: 32,
    marginBottom: 32,
  },
});
