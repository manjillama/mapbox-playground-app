import React, {useState} from 'react';
import {StatusBar, View} from 'native-base';
import {StyleSheet} from 'react-native';
import MapboxGL from '@react-native-mapbox-gl/maps';
import {MAPBOX_ACCESS_TOKEN} from '@env';
import SearchPanel from './components/SearchPanel';
import MenuModal from '../../components/menu-modal';
import {useFetchMapLocations} from './hooks/useFetchMapLocations';
import AddLocationMarkers from './components/AddLocationMarkers';
import BikeIcon from '../../assets/p1.png';
import ChargingStationIcon from '../../assets/charging-station.png';
import ServiceCenterIcon from '../../assets/servicing-center.png';

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
export const NEPAL_BOUNDRIES: {
  ne: [number, number];
  sw: [number, number];
} = {
  ne: [88.09436, 29.84121],
  sw: [80.33333, 26.8412],
};

const MapScreen = () => {
  const [openMenu, setOpenMenu] = useState(false);
  const [showNonMapItems, setShowNonMapItems] = useState(true);
  const [bikeGeoLocation, setBikeGeoLocation] = useState<[number, number]>([
    85.32996009929492, 27.73070808550141,
  ]);
  const [, chargeStations] = useFetchMapLocations(
    'charge-stations',
    800,
    bikeGeoLocation[1],
    bikeGeoLocation[0],
  );

  const [, serviceCenters] = useFetchMapLocations(
    'service-centers',
    800,
    bikeGeoLocation[1],
    bikeGeoLocation[0],
  );

  return (
    <>
      <StatusBar
        translucent
        barStyle="dark-content"
        backgroundColor="#946f5f"
      />

      <View style={styles.page}>
        <MapboxGL.MapView style={styles.map}>
          <MapboxGL.UserLocation animated showsUserHeadingIndicator visible />
          <MapboxGL.Camera
            zoomLevel={12}
            centerCoordinate={bikeGeoLocation}
            animationMode="flyTo"
            maxBounds={NEPAL_BOUNDRIES}
          />
          <AddLocationMarkers
            coordinates={[bikeGeoLocation]}
            markerImage={BikeIcon}
          />
          <AddLocationMarkers
            coordinates={chargeStations.map((c: any) => [
              c.location.coordinates[0],
              c.location.coordinates[1],
            ])}
            markerImage={ChargingStationIcon}
          />
          <AddLocationMarkers
            coordinates={serviceCenters.map((c: any) => [
              c.location.coordinates[0],
              c.location.coordinates[1],
            ])}
            markerImage={ServiceCenterIcon}
          />
        </MapboxGL.MapView>
        <SearchPanel setOpenMenu={setOpenMenu} shouldShow={showNonMapItems} />
        <MenuModal openMenu={openMenu} setOpenMenu={setOpenMenu} />
      </View>
    </>
  );
};

export default MapScreen;
