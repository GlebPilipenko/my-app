import {FC, useCallback, useEffect, useState} from 'react';
import {createMap} from './utils';
import {PropsType} from './typings';
import {DefaultQueryParameters} from 'src/enums';
import {MapAPIType} from 'src/api/mapApi/typings';
import {ErrorMessage} from 'src/common/errorMessage';
import {getCoordsByCity, getCoordsByCountry} from 'src/api/mapApi';

export const MapContainer: FC<PropsType> = ({
  city = DefaultQueryParameters.InvalidCity,
  coords = DefaultQueryParameters.InvalidCoords,
  country = DefaultQueryParameters.InvalidCountry,
}) => {
  const [state, setState] = useState<any | MapAPIType>(null);
  const [error, setError] = useState<string>('');

  const index = -1;
  const commaInSubstr = coords.indexOf(',') === index;

  const invalidCity = DefaultQueryParameters.InvalidCity;
  const invalidCoords = DefaultQueryParameters.InvalidCoords;
  const invalidCountry = DefaultQueryParameters.InvalidCountry;
  const isInvalidCity = (city === invalidCity);
  const isInvalidCoords = (coords === invalidCoords);
  const isInvalidCountry = (country === invalidCountry);
  const cityAndCountryIsInvalid =
    (!city || isInvalidCity) && (!country || isInvalidCountry);

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
    const invalidCoords = (!coords || isInvalidCoords || commaInSubstr);

    if (state || (state && invalidCoords)) {
      const {lat, lng} = state.results[0].geometry.location;
      createMap(lat, lng);
    }

    if (!state && (coords && !isInvalidCoords)) {
      if (coords.indexOf(',') !== index) {
        const [lat, lng] = coords.split(',');
        createMap(+lat, +lng);
      }
    }

  }, [coords, index, isInvalidCoords]);

  useEffect(() => {
    (async () => {
      try {
        if (cityAndCountryIsInvalid && commaInSubstr) {
          setError(`Enter correct coords with comma: ' , '`);

          return;
        }

        if (city) {
          if (isInvalidCity && (country && !isInvalidCountry)) {
            await requestByCountry();

            return;
          }

          const coordsByCity = await getCoordsByCity(city);
          const cityArrayLength = coordsByCity.data.results.length;

          if (cityArrayLength !== 0) {
            setState(coordsByCity.data);

            return;
          }

          if ((cityArrayLength === 0) && (!country || isInvalidCountry) && commaInSubstr) {
            setError(`Enter valid city, country or coords with ' , '`);
          }

          if (cityArrayLength === 0 && (country !== invalidCountry && !country)) {
            await requestByCountry();
          }
        }

        if (country && (country !== invalidCountry)) {
          await requestByCountry();
        }

        return;
      } catch (e) {
        e.response && setError(e.response.data.error_message);
      }
    })();
  }, [city, coords, country, index, isInvalidCity, invalidCountry,
    isInvalidCoords, isInvalidCountry, requestByCountry, cityAndCountryIsInvalid
  ]);

  useEffect(() => {
    renderMap(state);
  }, [renderMap, state]);

  if (error) {
    return <ErrorMessage errorMessage={error} />;
  }

  return <div id={'map'} style={{width: '100%', height: '100vh'}} />;
};
