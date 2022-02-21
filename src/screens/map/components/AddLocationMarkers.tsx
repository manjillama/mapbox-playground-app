import React from 'react';
import {Image, ImageSourcePropType, TouchableOpacity} from 'react-native';
import MapboxGL from '@react-native-mapbox-gl/maps';

function AddLocationMarkers({
  coordinates,
  markerImage,
}: {
  coordinates: [[number, number]];
  markerImage: ImageSourcePropType;
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
          <TouchableOpacity>
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
