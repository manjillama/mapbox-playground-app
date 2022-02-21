import React, {useState} from 'react';
import {Box, Button, Input, Text, View} from 'native-base';
import * as Animatable from 'react-native-animatable';
import styles from './styles';
import {TouchableOpacity} from 'react-native';
import AntIcon from 'react-native-vector-icons/AntDesign';
import FeatherIcon from 'react-native-vector-icons/Feather';
import MCIcon from 'react-native-vector-icons/MaterialIcons';
import {DarkTheme} from '@react-navigation/native';
import {SafeAreaView} from 'react-native-safe-area-context';

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
  const [openSearchBox, setOpenSearchBox] = useState(false);

  return (
    <Animatable.View
      animation={shouldShow ? 'slideInDown' : 'slideOutUp'}
      duration={500}>
      <View
        style={[openSearchBox ? styles.fullScreenPanel : styles.searchPanel]}
        borderColor="light.50">
        <SafeAreaView>
          {!openSearchBox ? (
            <Box style={styles.topPanel}>
              <TouchableOpacity
                style={{paddingRight: 8}}
                onPress={() => setOpenMenu(true)}>
                <MCIcon name="menu" size={28} color="#3a3a3a" />
              </TouchableOpacity>
              <TouchableOpacity
                style={{flex: 1}}
                onPress={() => setOpenSearchBox(true)}>
                <Box height="100%" justifyContent="center">
                  <Text fontSize={16} color="dark.100">
                    Search here
                  </Text>
                </Box>
              </TouchableOpacity>
            </Box>
          ) : (
            <Box style={styles.topPanel}>
              <TouchableOpacity
                style={{
                  justifyContent: 'center',
                  height: '100%',
                  paddingRight: 4,
                  marginLeft: -4,
                }}
                onPress={() => setOpenSearchBox(false)}>
                <FeatherIcon name="chevron-left" size={30} />
              </TouchableOpacity>
              <Input
                padding={0}
                height="100%"
                fontSize={16}
                _focus={{
                  borderWidth: 0,
                }}
                placeholder="Search"
                flex={1}
                autoFocus={true}
                color="dark.100"
              />
            </Box>
          )}
        </SafeAreaView>
      </View>
    </Animatable.View>
  );
};

function SearchBox() {}

export default SearchPanel;
