import { StyleSheet } from 'react-native';

import { DARKER_WHITE, DEFAULT_BLACK } from '@/styles/colors';

const styles = StyleSheet.create({
  searchWrapper: {
    backgroundColor: DARKER_WHITE,
    borderRadius: 8,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  searchInput: {
    height: 48,
    flex: 1,
    color: DEFAULT_BLACK,
  },
});

export default styles;
