import { Platform } from 'react-native';

import { DEFAULT_BLACK, DEFAULT_WHITE, STATUS_BAR_THEME } from '@/styles/colors';

export const DEFAULT_HEADER_SCREEN = {
  ...Platform.select({
    ios: {},
    android: {
      statusBarColor: DEFAULT_WHITE,
      statusBarStyle: STATUS_BAR_THEME,
    },
  }),
};

export const NO_HEADER_SCREEN_OPTIONS = {
  headerShown: false,
  ...DEFAULT_HEADER_SCREEN,
};

export const WITH_HEADER_SCREEN_OPTIONS = {
  headerStyle: { backgroundColor: DEFAULT_WHITE },
  headerTitleStyle: { color: DEFAULT_BLACK },
  headerTintColor: DEFAULT_BLACK,
  headerBackTitleVisible: false,
  ...DEFAULT_HEADER_SCREEN,
};
