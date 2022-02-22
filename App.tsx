/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * Generated with the TypeScript template
 * https://github.com/react-native-community/react-native-template-typescript
 *
 * @format
 */
import React from 'react';
import {NativeBaseProvider, extendTheme} from 'native-base';
import {NavigationContainer} from '@react-navigation/native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import HomeScreen from './src/screens/HomeScreen';
import MapScreen from './src/screens/map';
// import {RootStackParamList} from './src/types';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import SettingsRoot from './src/screens/settings';
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
const theme = extendTheme({
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

const Tab = createBottomTabNavigator();

const App = () => {
  return (
    <SafeAreaProvider>
      <NavigationContainer>
        <NativeBaseProvider theme={theme}>
          <Tab.Navigator
            screenOptions={{
              tabBarStyle: {display: 'none'},
            }}>
            <Tab.Screen name="Home" component={HomeScreen} />
            <Tab.Screen
              options={{
                headerShown: false,
              }}
              name="Map"
              component={MapScreen}
            />
            <Tab.Screen
              options={{
                headerShown: false,
              }}
              name="SettingsRoot"
              component={SettingsRoot}
            />
          </Tab.Navigator>
        </NativeBaseProvider>
      </NavigationContainer>
    </SafeAreaProvider>
  );
};
export default App;
