import { Appearance } from 'react-native';

export const CURRENT_SCHEME = Appearance.getColorScheme() || 'light';
type ColorScheme = 'dark' | 'light';
type ColorObj = Record<ColorScheme, string>;

const DEFAULT_WHITE_OBJ: ColorObj = {
  light: '#fbfbfb',
  dark: '#333333',
};

const DEFAULT_BLACK_OBJ: ColorObj = {
  light: '#111111',
  dark: '#fbfbfb',
};

const DARKER_WHITE_OBJ: ColorObj = {
  light: '#ebebeb',
  dark: '#555555',
};

const PRIMARY_COLOR_OBJ: ColorObj = {
  light: '#0746a6',
  dark: '#5d9af8',
};

const LIGHTER_BLACK_OBJ: ColorObj = {
  light: '#AAAAAA',
  dark: '#777777',
};

const STATUS_BAR_THEME_OBJ: Record<ColorScheme, ColorScheme> = {
  dark: 'light',
  light: 'dark',
};

export const STATUS_BAR_THEME = STATUS_BAR_THEME_OBJ[CURRENT_SCHEME];
export const DEFAULT_WHITE = DEFAULT_WHITE_OBJ[CURRENT_SCHEME];
export const DARKER_WHITE = DARKER_WHITE_OBJ[CURRENT_SCHEME];
export const DEFAULT_BLACK = DEFAULT_BLACK_OBJ[CURRENT_SCHEME];
export const PRIMARY_COLOR = PRIMARY_COLOR_OBJ[CURRENT_SCHEME];

export const LIGHTER_BLACK = LIGHTER_BLACK_OBJ[CURRENT_SCHEME];
