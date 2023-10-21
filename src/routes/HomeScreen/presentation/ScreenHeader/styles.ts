import { StyleSheet } from 'react-native';

import { PRIMARY_COLOR } from '@/styles/colors';

export const styles = StyleSheet.create({
  screenTextTitle: {
    fontSize: 32,
    color: PRIMARY_COLOR,
  },
  screenWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 32,
  },
});
