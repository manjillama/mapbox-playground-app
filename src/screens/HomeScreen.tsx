import React from 'react';
import {Center, Heading, Text, VStack} from 'native-base';
import {withRootScreen} from '../hoc/RootScreen';
import Icon from '../components/icon';

const HomeScreen = () => (
  <Center px={4} flex={1}>
    <VStack space={5} alignItems="center">
      <Icon color="red" as="mi" name="location-searching" />
      <Heading size="lg" fontFamily={'Barlow-Regular'}>
        Welcome to home screen 0
      </Heading>
      <Text fontWeight={300}>Welcome to home screen 300</Text>
      <Text>Welcome to home screen</Text>
      <Text fontWeight={500}>Welcome to home screen 500</Text>
      <Text fontWeight={600}>Welcome to home screen 600</Text>
      <Text fontWeight={700}>Welcome to home screen 700</Text>
    </VStack>
  </Center>
);

export default withRootScreen(HomeScreen);
