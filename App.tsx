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
