import { StyleSheet } from 'react-native';

import { DEFAULT_WHITE, PRIMARY_COLOR } from '@/styles/colors';

const styles = StyleSheet.create({
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
  outerWrapper: {
    backgroundColor: DEFAULT_WHITE,
    height: '100%',
  },
  upperWrapper: {
    padding: 20,
  },
  listWrapper: {
    paddingHorizontal: 20,
  },
});

export default styles;
