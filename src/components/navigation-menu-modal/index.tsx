import React from 'react';
import {View, VStack} from 'native-base';
import CustomModal from '../custom-modal';
import styles from './styles';
import {useNavigation, useRoute} from '@react-navigation/native';
import {BottomTabNavigationProp} from '@react-navigation/bottom-tabs';
import {RouteName} from './@types';
import MenuItem from './menu-item';

const NavigationMenuModal = ({
  openNavigationMenu,
  setOpenNavigationMenu,
}: {
  openNavigationMenu: boolean;
  setOpenNavigationMenu: (visibility: boolean) => void;
}) => {
  const navigation = useNavigation<BottomTabNavigationProp<any>>();
  const route = useRoute();

  function closeAndNavigate(routeName: RouteName) {
    setOpenNavigationMenu(false);
    navigation.navigate(routeName);
  }

  return (
    <CustomModal
      animationIn="slideInLeft"
      animationOut="slideOutLeft"
      isModalVisible={openNavigationMenu}
      setModalVisible={setOpenNavigationMenu}
      swipeDirection="left"
      onSwipeComplete={() => setOpenNavigationMenu(false)}
      style={styles.container}>
      <View style={{flex: 1, backgroundColor: '#fff'}}>
        <VStack space={4}>
          <MenuItem
            selected={route.name === 'Home'}
            text="Home"
            onPress={() => closeAndNavigate('Home')}
          />
          <MenuItem
            selected={route.name === 'Map'}
            text="Map"
            onPress={() => closeAndNavigate('Map')}
          />
          <MenuItem
            selected={route.name === 'Settings'}
            text="Settings"
            onPress={() => closeAndNavigate('SettingsRoot')}
          />
        </VStack>
      </View>
    </CustomModal>
  );
};

export default NavigationMenuModal;
