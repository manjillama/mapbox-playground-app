import React from 'react';
import {Button, Center, Heading, VStack} from 'native-base';
import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {withRootScreen} from '../../hoc/RootScreen';

const SettingsScreen = () => {
  const navigation = useNavigation<NativeStackNavigationProp<any>>();
  return (
    <Center px={4} flex={1} bg="amber.100">
      <VStack space={5} alignItems="center">
        <Heading size="lg">Welcome to settings screen</Heading>
        <Button
          onPress={() => {
            navigation.push('About');
          }}>
          About
        </Button>
      </VStack>
    </Center>
  );
};

export default withRootScreen(SettingsScreen);
