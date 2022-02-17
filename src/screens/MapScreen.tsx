import React from 'react';
import {Center, Heading, VStack} from 'native-base';
import {StatusBar} from 'react-native';
import {withRootScreen} from '../hoc/RootScreen';

const MapScreen = () => (
  <>
    <StatusBar barStyle="light-content" />
    <Center
      _dark={{bg: 'blueGray.900'}}
      _light={{bg: 'blueGray.50'}}
      px={4}
      flex={1}>
      <VStack space={5} alignItems="center">
        <Heading size="lg">Welcome to Map Screen</Heading>
      </VStack>
    </Center>
  </>
);

export default withRootScreen(MapScreen);
