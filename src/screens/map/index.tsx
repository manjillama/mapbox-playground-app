import React, {useEffect, useState} from 'react';
import {StatusBar, View} from 'native-base';
import {StyleSheet} from 'react-native';
import MapboxGL from '@react-native-mapbox-gl/maps';
import {MAPBOX_ACCESS_TOKEN} from '@env';
import SearchPanel from './components/SearchPanel';
import MenuModal from '../../components/menu-modal';

MapboxGL.setAccessToken(MAPBOX_ACCESS_TOKEN);
const styles = StyleSheet.create({
  page: {
    height: '110%',
  },
  map: {
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    position: 'absolute',
  },
});
const MapScreen = () => {
  const [openMenu, setOpenMenu] = useState(false);
  const [showNonMapItems, setShowNonMapItems] = useState(true);

  return (
    <>
      <StatusBar
        translucent
        barStyle="dark-content"
        backgroundColor="#946f5f"
      />

      <View style={styles.page}>
        <MapboxGL.MapView style={styles.map} />
        <SearchPanel setOpenMenu={setOpenMenu} shouldShow={showNonMapItems} />
        <MenuModal openMenu={openMenu} setOpenMenu={setOpenMenu} />
      </View>
    </>
  );
};

export default MapScreen;
