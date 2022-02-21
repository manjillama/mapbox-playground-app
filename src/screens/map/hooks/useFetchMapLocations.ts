import {AxiosResponse} from 'axios';
import {useState, useEffect} from 'react';
import {get} from '../../../api/axios';

/**
 * @param  {string} url
 * @param  {any} params
 * @returns {Array} [error, fetching, response]
 */
export function useFetchMapLocations(
  locationType: 'service-centers' | 'charge-stations',
  distance: number,
  lat: number,
  lng: number,
  unit = 'km',
): [boolean, any, Error | null] {
  const [fetching, setFetching] = useState(true);
  const [data, setData] = useState([]);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    setFetching(true);
    get(`/${locationType}/within/${distance}/center/${lat}, ${lng}/${unit}`)
      .then((response: AxiosResponse) => {
        setData(response.data.data.data);
        setFetching(false);
      })
      .catch((err: Error) => {
        setError(err);
        setFetching(false);
      });
  }, [locationType, distance, lat, lng, unit]);

  return [fetching, data, error];
}
