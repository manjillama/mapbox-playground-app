import React from 'react';
import {Button, View} from 'native-base';
import * as Animatable from 'react-native-animatable';
import styles from './styles';

// interface Props {
//   shouldShow: boolean;
//   inAnimation: Animatable.Animation | string;
//   outAnimation: Animatable.Animation | string;
//   children: React.ReactNode;
//   animation?: Animatable.Animation | string;
//   duration?: number;
//   delay?: number;
//   direction?: Animatable.Direction;
//   easing?: Animatable.Easing;
//   iterationCount?: number | 'infinite';
//   iterationDelay?: number;
//   transition?: any;
//   useNativeDriver?: boolean;
//   onAnimationBegin?: Function;
//   onAnimationEnd?: Function;
//   onTransitionBegin?: (property: string) => void;
//   onTransitionEnd?: (property: string) => void;
//   style?: StyleProp<any>;
// }

type Props = {
  setOpenMenu: (openMenu: boolean) => void;
  shouldShow: boolean;
};

const SearchPanel = ({setOpenMenu, shouldShow}: Props) => {
  return (
    <Animatable.View
      animation={shouldShow ? 'slideInDown' : 'slideOutUp'}
      duration={500}>
      <View style={styles.container} borderColor="light.50">
        <Button height={34} onPress={() => setOpenMenu(true)}>
          Menu
        </Button>
      </View>
    </Animatable.View>
  );
};

export default SearchPanel;
