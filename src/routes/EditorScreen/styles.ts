import { StyleSheet } from 'react-native';

import { DEFAULT_BLACK, DEFAULT_WHITE } from '@/styles/colors';

const styles = StyleSheet.create({
  editorText: {
    height: '100%',
    color: DEFAULT_BLACK,
    lineHeight: 24,
    padding: 20,
    paddingBottom: 52,
  },
  editorTitle: {
    fontSize: 24,
    padding: 20,
    color: DEFAULT_BLACK,
  },
  editorOuterWrapper: {
    backgroundColor: DEFAULT_WHITE,
    marginBottom: 72,
  },
});

export default styles;
