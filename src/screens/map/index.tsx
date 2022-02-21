import React, {useState} from 'react';
import {StatusBar, View} from 'native-base';
import {StyleSheet, TouchableOpacity} from 'react-native';
import MapboxGL from '@react-native-mapbox-gl/maps';
import mbxDirectionsService from '@mapbox/mapbox-sdk/services/directions';
import {MAPBOX_ACCESS_TOKEN} from '@env';
import SearchPanel from './components/SearchPanel';
import MenuModal from '../../components/menu-modal';
import {useFetchMapLocations} from './hooks/useFetchMapLocations';
import AddLocationMarkers from './components/AddLocationMarkers';
import BikeIcon from '../../assets/p1.png';
import ChargingStationIcon from '../../assets/charging-station.png';
import ServiceCenterIcon from '../../assets/servicing-center.png';

MapboxGL.setAccessToken(MAPBOX_ACCESS_TOKEN);
const mbxDirectionClient = mbxDirectionsService({
  accessToken: MAPBOX_ACCESS_TOKEN,
});

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
  const [directionRoutes, setDirectionRoutes] = useState<{
    routes:
      | null
      | {
          distance: number;
          duration: number;
          geometry: {
            coordinates: [number, number];
          };
        }[];
    currentRouteIndex: number;
  }>({
    routes: null,
    currentRouteIndex: 0,
  });
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

  function setNavigationRoutes(destLat: number, destLon: number) {
    mbxDirectionClient
      .getDirections({
        alternatives: true,
        profile: 'driving-traffic',
        waypoints: [
          {
            coordinates: bikeGeoLocation,
          },
          {
            coordinates: [destLon, destLat],
          },
        ],
        steps: true,
        bannerInstructions: true,
        geometries: 'geojson',
      })
      .send()
      .then(({body: {routes}}: any) => {
        setDirectionRoutes({
          ...directionRoutes,
          routes: routes.map((route: any, index: any) => {
            if (index > 1) return;
            return route;
          }),
        });
      });
  }

  console.log('Direction Routes', directionRoutes);

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
          {directionRoutes.routes && (
            <>
              {directionRoutes.routes.map((route, index) => {
                const layerProps: any = {};
                if (directionRoutes.currentRouteIndex === index) {
                  if (index === 0) layerProps.aboveLayerID = `routeFill-${1}`;
                  else layerProps.aboveLayerID = `routeFill-${0}`;
                }
                console.log(layerProps);

                return (
                  <MapboxGL.ShapeSource
                    key={index}
                    onPress={() =>
                      setDirectionRoutes({
                        ...directionRoutes,
                        currentRouteIndex: index,
                      })
                    }
                    id={`route-${index}`}
                    shape={{
                      type: 'LineString',
                      coordinates: route.geometry.coordinates,
                    }}>
                    <MapboxGL.LineLayer
                      id={`routeFill-${index}`}
                      style={{
                        lineColor:
                          index === directionRoutes.currentRouteIndex
                            ? '#26b0ff'
                            : '#ccc',
                        lineWidth: 5,
                        lineCap: 'square',
                        lineOpacity: 1,
                      }}
                      {...layerProps}
                    />
                  </MapboxGL.ShapeSource>
                );
              })}
            </>
          )}
        </MapboxGL.MapView>
        <SearchPanel
          setNavigationRoutes={setNavigationRoutes}
          setOpenMenu={setOpenMenu}
          shouldShow={showNonMapItems}
        />
        <MenuModal openMenu={openMenu} setOpenMenu={setOpenMenu} />
      </View>
    </>
  );
};

export default MapScreen;
