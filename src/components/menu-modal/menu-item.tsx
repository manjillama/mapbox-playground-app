import React from 'react';
import {Box, Button} from 'native-base';

type Props = {
  text: string;
  onPress: () => void;
  selected: boolean;
};

const MenuItem = ({text, onPress, selected}: Props) => (
  <Box>
    <Button
      backgroundColor={selected ? 'light.50' : 'dark.50'}
      onPress={onPress}>
      {text}
    </Button>
  </Box>
);

export default MenuItem;
