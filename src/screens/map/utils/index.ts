import mbxDirectionsService from '@mapbox/mapbox-sdk/services/directions';
import {MAPBOX_ACCESS_TOKEN} from '@env';

const mbxDirectionClient = mbxDirectionsService({
  accessToken: MAPBOX_ACCESS_TOKEN,
});

export function getNavigationRoutes(
  startingCoordinates: [number, number],
  destinationCoordinates: [number, number],
  callbackFn: (routes: any) => void,
) {
  mbxDirectionClient
    .getDirections({
      alternatives: true,
      profile: 'driving-traffic',
      waypoints: [
        {
          coordinates: startingCoordinates,
        },
        {
          coordinates: destinationCoordinates,
        },
      ],
      steps: true,
      bannerInstructions: true,
      geometries: 'geojson',
    })
    .send()
    .then(({body: {routes}}: any) => {
      callbackFn(routes);
    })
    .catch();
}
