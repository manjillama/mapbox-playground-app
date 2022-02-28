import React from 'react';
import {NativeBaseProvider} from 'native-base';
import {NavigationContainer} from '@react-navigation/native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {RootStackParamList} from './src/types';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {appTheme} from './src/theme';
import {HomeScreen, MapScreen, SettingsRoot} from './src/screens';

const Tab = createBottomTabNavigator<RootStackParamList>();

const App = () => {
  return (
    <SafeAreaProvider>
      <NavigationContainer>
        <NativeBaseProvider theme={appTheme}>
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
