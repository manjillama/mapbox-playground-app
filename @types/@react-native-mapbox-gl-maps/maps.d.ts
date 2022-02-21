import {Component} from 'react';

declare module '@react-native-mapbox-gl-maps/maps' {
  interface ShapeSourceProps {
    shape: {type: 'LineString'; coordinates: number[]};
  }

  export class ShapeSource extends Component<ShapeSourceProps> {}
}
