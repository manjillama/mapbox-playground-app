import axios, {AxiosResponse} from 'axios';
import {useState, useEffect} from 'react';
import {MAPBOX_ACCESS_TOKEN} from '@env';

/**
 * @param  {string} url
 * @param  {any} params
 * @returns {Array} [error, fetching, response]
 */
export function useFetchGeoCoding(
  location: string,
): [boolean, any, Error | null] {
  const [fetching, setFetching] = useState(true);
  const [data, setData] = useState([]);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    setFetching(true);
    axios
      .get(
        `https://api.mapbox.com/geocoding/v5/mapbox.places/${location}.json?country=np&types=place%2Caddress%2Ccountry%2Cregion%2Cdistrict%2Clocality%2Cneighborhood%2Cpoi&language=en&access_token=${MAPBOX_ACCESS_TOKEN}`,
      )
      .then((response: AxiosResponse) => {
        setData(response.data.features);
        setFetching(false);
      })
      .catch((err: Error) => {
        setError(err);
        setFetching(false);
      });
  }, [location]);

  return [fetching, data, error];
}
