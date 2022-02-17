import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import SettingsScreen from './SettingScreen';
import AboutScreen from './AboutScreen';

const Stack = createNativeStackNavigator();

function SettingsRoot(): JSX.Element {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Settings" component={SettingsScreen} />
      <Stack.Screen name="About" component={AboutScreen} />
    </Stack.Navigator>
  );
}

export default SettingsRoot;
