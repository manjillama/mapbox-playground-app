import React from 'react';
import {Image, ImageSourcePropType, TouchableOpacity} from 'react-native';
import MapboxGL from '@react-native-mapbox-gl/maps';

const AddLocationMarkers = ({
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
}): JSX.Element => (
  <>
    {coordinates.map((coords, index) => (
      <MapboxGL.MarkerView
        key={index}
        id={`marker-${index}`}
        coordinate={[coords[0], coords[1]]}>
        <TouchableOpacity
          onPress={() => {
            if (setNavigationRoutes) setNavigationRoutes(coords[1], coords[0]);
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

export default AddLocationMarkers;
