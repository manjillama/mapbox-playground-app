import React from 'react';
import {Image, ImageSourcePropType, TouchableOpacity} from 'react-native';
import MapboxGL from '@react-native-mapbox-gl/maps';

function AddLocationMarkers({
  coordinates,
  markerImage,
  setNavigationRoutes,
}: {
  coordinates: [[number, number]];
  markerImage: ImageSourcePropType;
  setNavigationRoutes?: (
    destLat: number,
    destLon: number,
    showMarker?: boolean,
  ) => void;
  disabled?: boolean;
}): JSX.Element {
  //   if (chargeStations.length <= 0) return null;

  //   return (
  //     <MapboxGL.ShapeSource
  //       id="symbolLocationSource_chargingStation"
  //       hitbox={{width: 30, height: 30}}
  //       // onPress={(e): void => onStationPress(e.features[0])}
  //       shape={{
  //         type: 'FeatureCollection',
  //         features: chargeStations.map(c => ({
  //           type: 'Feature',
  //           geometry: {
  //             type: 'Point',
  //             coordinates: [c.location.coordinates[0], c.location.coordinates[1]],
  //           },
  //         })),
  //       }}>
  //       <MapboxGL.SymbolLayer
  //         id="chargingStationIcon"
  //         style={{
  //           iconImage: ChargingStationIcon,
  //         }}
  //       />
  //     </MapboxGL.ShapeSource>
  //   );

  return (
    <>
      {coordinates.map((coords, index) => (
        <MapboxGL.MarkerView
          key={index}
          id={`marker-${index}`}
          coordinate={[coords[0], coords[1]]}>
          <TouchableOpacity
            onPress={() => {
              if (setNavigationRoutes)
                setNavigationRoutes(coords[1], coords[0]);
            }}>
            <Image
              source={markerImage}
              style={{
                flex: 1,
                resizeMode: 'contain',
                height: 42,
              }}
            />
          </TouchableOpacity>
        </MapboxGL.MarkerView>
      ))}
    </>
  );
}

export default AddLocationMarkers;
