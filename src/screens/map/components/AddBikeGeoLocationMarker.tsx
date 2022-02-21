import React from 'react';
import {Image, TouchableOpacity} from 'react-native';
import MapboxGL from '@react-native-mapbox-gl/maps';
import BikeMarker from '../../../assets/p1.png';

function AddBikeGeoLocationMarker({
  bikeGeoLocation,
}: {
  bikeGeoLocation: number[];
}): JSX.Element {
  return (
    <MapboxGL.MarkerView id={'marker'} coordinate={bikeGeoLocation}>
      <TouchableOpacity>
        <Image
          source={BikeMarker}
          style={{
            flex: 1,
            resizeMode: 'contain',
            width: 70,
            height: 50,
          }}
        />
      </TouchableOpacity>
    </MapboxGL.MarkerView>
  );
}

export default AddBikeGeoLocationMarker;
