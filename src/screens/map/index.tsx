import React, {useState} from 'react';
import {StatusBar, View} from 'native-base';
import {TouchableOpacity} from 'react-native';
import MapboxGL from '@react-native-mapbox-gl/maps';
import {MAPBOX_ACCESS_TOKEN} from '@env';
import SearchPanel from './components/SearchPanel';
import MenuModal from '../../components/navigation-menu-modal';
import {useFetchMapLocations} from './hooks/useFetchMapLocations';
import AddLocationMarkers from './components/AddLocationMarkers';
import BikeIcon from '../../assets/p1.png';
import LocationIcon from '../../assets/location-marker.png';
import ChargingStationIcon from '../../assets/charging-station.png';
import ServiceCenterIcon from '../../assets/servicing-center.png';
import {getNavigationRoutes} from './utils';
import Icon from '../../components/icon';

MapboxGL.setAccessToken(MAPBOX_ACCESS_TOKEN);

export const NEPAL_BOUNDRIES: {
  ne: [number, number];
  sw: [number, number];
} = {
  ne: [88.09436, 29.84121],
  sw: [80.33333, 26.8412],
};

const MapScreen = () => {
  const [openNavigationMenu, setOpenNavigationMenu] = useState(false);
  const [showNonMapItems, setShowNonMapItems] = useState(true);
  const [bikeGeoLocation, setBikeGeoLocation] = useState<[number, number]>([
    85.32996009929492, 27.73070808550141,
  ]);
  const [bounds, setBounds] = useState({
    ne: bikeGeoLocation,
    sw: bikeGeoLocation,
  });
  const [centerCoordinate, setCenterCoordinate] = useState([
    bikeGeoLocation[0],
    bikeGeoLocation[1],
  ]);
  const [directionRoute, setDirectionRoute] = useState<{
    distance: number;
    duration: number;
    geometry: {
      coordinates: [number, number][];
    };
    showMarker?: boolean;
  } | null>(null);
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

  function setNavigationRoutes(
    destLat: number,
    destLon: number,
    showMarker = false,
  ) {
    getNavigationRoutes(bikeGeoLocation, [destLon, destLat], (routes: any) => {
      setDirectionRoute({...routes[0], showMarker});
      const destinationCoordinates =
        routes[0].geometry.coordinates[
          routes[0].geometry.coordinates.length - 1
        ];
      setDestinationBound(destinationCoordinates);
    });
  }

  function setDestinationBound(destinationBound: [number, number]) {
    setBounds({
      ...bounds,
      sw: destinationBound,
    });
  }

  function recenterCamera(coordinates: [number, number]) {
    setCenterCoordinate(coordinates);
    setTimeout(() => setCenterCoordinate([0, 0]), 200);
  }

  return (
    <>
      <StatusBar
        translucent
        barStyle="dark-content"
        backgroundColor="#946f5f"
      />

      <View style={{height: '110%'}}>
        <MapboxGL.MapView
          style={{
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            position: 'absolute',
          }}
          onDidFinishRenderingMapFully={() => {
            recenterCamera(bikeGeoLocation);
          }}>
          <MapboxGL.UserLocation animated showsUserHeadingIndicator visible />
          <MapboxGL.Camera
            zoomLevel={12}
            centerCoordinate={
              centerCoordinate[0] !== 0 && centerCoordinate[0] !== 0
                ? centerCoordinate
                : undefined
            }
            animationMode="flyTo"
            padding={{
              paddingLeft: 20,
              paddingRight: 20,
              paddingTop: 20,
              paddingBottom: 20,
            }}
            maxBounds={NEPAL_BOUNDRIES}
            bounds={bounds}
          />
          <AddLocationMarkers
            setNavigationRoutes={setNavigationRoutes}
            coordinates={[bikeGeoLocation]}
            markerImage={BikeIcon}
          />
          <AddLocationMarkers
            setNavigationRoutes={setNavigationRoutes}
            coordinates={chargeStations.map((c: any) => [
              c.location.coordinates[0],
              c.location.coordinates[1],
            ])}
            markerImage={ChargingStationIcon}
          />
          <AddLocationMarkers
            setNavigationRoutes={setNavigationRoutes}
            coordinates={serviceCenters.map((c: any) => [
              c.location.coordinates[0],
              c.location.coordinates[1],
            ])}
            markerImage={ServiceCenterIcon}
          />
          {directionRoute && (
            <>
              <MapboxGL.ShapeSource
                id="route"
                shape={{
                  type: 'LineString',
                  coordinates: directionRoute.geometry.coordinates,
                }}>
                <MapboxGL.LineLayer
                  id="routeLayer"
                  style={{
                    lineColor: '#26b0ff',
                    lineWidth: 5,
                    lineCap: 'square',
                    lineOpacity: 1,
                  }}
                />
              </MapboxGL.ShapeSource>
              {directionRoute.showMarker && (
                <AddLocationMarkers
                  coordinates={[
                    directionRoute.geometry.coordinates[
                      directionRoute.geometry.coordinates.length - 1
                    ],
                  ]}
                  markerImage={LocationIcon}
                />
              )}
            </>
          )}
        </MapboxGL.MapView>
        <View
          position="absolute"
          bottom={200}
          right={4}
          rounded="full"
          size="12"
          shadow={4}
          bgColor="primary.50">
          <TouchableOpacity
            style={{
              height: '100%',
              width: '100%',
              justifyContent: 'center',
              alignItems: 'center',
            }}
            onPress={() => recenterCamera(bikeGeoLocation)}>
            <Icon as="mi" color="white" name="location-searching" size={22} />
          </TouchableOpacity>
        </View>
        <SearchPanel
          setNavigationRoutes={setNavigationRoutes}
          setOpenNavigationMenu={setOpenNavigationMenu}
          shouldShow={showNonMapItems}
        />

        <MenuModal
          openNavigationMenu={openNavigationMenu}
          setOpenNavigationMenu={setOpenNavigationMenu}
        />
      </View>
    </>
  );
};

export default MapScreen;
