import {extendTheme} from 'native-base';

const newColorTheme = {
  primary: {
    50: '#0cc',
  },
  light: {
    50: '#EFEFEF',
  },
  dark: {
    50: '#AAAAAA',
  },
};

const config = {
  useSystemColorMode: false,
  initialColorMode: 'light',
};
export const appTheme = extendTheme({
  config,
  colors: newColorTheme,
  fontConfig: {
    Barlow: {
      300: {
        normal: 'Barlow-Light',
        italic: 'Barlow-LightItalic',
      },
      400: {
        normal: 'Barlow-Medium',
        italic: 'Barlow-Italic',
      },
      500: {
        normal: 'Barlow-SemiBold',
        italic: 'Barlow-SemiBoldItalic',
      },
      600: {
        normal: 'Barlow-Bold',
        italic: 'Barlow-BoldItalic',
      },
      700: {
        normal: 'Barlow-ExtraBold',
        italic: 'Barlow-ExtraBoldItalic',
      },
    },
  },
  // Make sure values below matches any of the keys in `fontConfig`
  fonts: {
    heading: 'Barlow',
    body: 'Barlow',
    mono: 'Barlow',
  },
});
