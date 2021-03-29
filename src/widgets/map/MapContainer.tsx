import {FC, useCallback, useEffect, useState} from 'react';
import {createMap} from './utils';
import {PropsType} from './typings';
import {DefaultQueryParameters} from 'src/enums';
import {MapAPIType} from 'src/api/mapApi/typings';
import {ErrorMessage} from 'src/common/errorMessage';
import {getCoordsByCity, getCoordsByCountry,} from 'src/api/mapApi';

export const MapContainer: FC<PropsType> = ({
  city,
  coords = DefaultQueryParameters.InvalidCoords,
  country = DefaultQueryParameters.InvalidCountry,
}) => {
  const [state, setState] = useState<any | MapAPIType>(null);
  const [error, setError] = useState<string>('');

  const invalidCoords = DefaultQueryParameters.InvalidCoords;
  const invalidCountry = DefaultQueryParameters.InvalidCountry;
  const isInvalidCoords = (coords === invalidCoords);
  const isInvalidCountry = (country === invalidCountry);
  const allPropsIsInvalid = !city
    && (!country || isInvalidCountry)
    && (!coords || isInvalidCoords);

  const requestByCountry = useCallback(async () => {
    const coordsByCountry = await getCoordsByCountry(country);
    const countryArrayLength = coordsByCountry.data.results.length;

    if (countryArrayLength !== 0) {
      setState(coordsByCountry.data);
    } else {
      setError(`Error, enter valid city, country or coords...`);
    }
  }, [country]);

  const renderMap = useCallback((state: MapAPIType) => {
    const index = -1;

    if (state) {
      const {lat, lng} = state.results[0].geometry.location;

      createMap(lat, lng);
    }

    if (!state && !isInvalidCoords) {
      if (coords.indexOf(',') !== index) {
        const [lat, lng] = coords.split(',');
        createMap(+lat, +lng);

        return;
      } else {
        setError(`Enter correct coords with comma: ' , '`)
      }
    }

  }, [coords, isInvalidCoords]);

  useEffect(() => {
    (async () => {
      try {
        if (allPropsIsInvalid) {
          setError(`Error, enter valid city, country or coords...`);

          return;
        }

        if (city) {
          const coordsByCity = await getCoordsByCity(city);
          const cityArrayLength = coordsByCity.data.results.length;

          if (cityArrayLength !== 0) {
            setState(coordsByCity.data);

            return;
          }

          if ((cityArrayLength === 0) && (country !== invalidCountry)) {
            await requestByCountry();
          }

          return;
        }

        if (country && (country !== invalidCountry)) {
          await requestByCountry();
        }
      } catch (e) {
        e.response && setError(e.response.data.error_message);
      }
    })();
  }, [city, coords, country, invalidCountry, isInvalidCoords, isInvalidCountry,
    requestByCountry, allPropsIsInvalid]);

  useEffect(() => {
    renderMap(state);
  }, [renderMap, state]);

  if (error) {
    return <ErrorMessage errorMessage={error} />;
  }

  return <div id={'map'} style={{width: '100%', height: '100vh'}} />;
};
