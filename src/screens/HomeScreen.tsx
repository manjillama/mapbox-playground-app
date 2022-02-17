import React from 'react';
import {Center, Heading, VStack} from 'native-base';
import {withRootScreen} from '../hoc/RootScreen';

const HomeScreen = () => (
  <Center px={4} flex={1}>
    <VStack space={5} alignItems="center">
      <Heading size="lg">Welcome to home screen</Heading>
    </VStack>
  </Center>
);

export default withRootScreen(HomeScreen);
