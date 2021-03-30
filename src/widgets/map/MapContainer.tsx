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

  const index = 1;
  const noComma = coords.indexOf(',') === -index;

  const invalidCity = DefaultQueryParameters.InvalidCity;
  const invalidCoords = DefaultQueryParameters.InvalidCoords;
  const invalidCountry = DefaultQueryParameters.InvalidCountry;
  const isInvalidCity = (city === invalidCity);
  const isInvalidCoords = (coords === invalidCoords);
  const isInvalidCountry = (country === invalidCountry);
  const notValidCoords = !coords || isInvalidCoords || noComma;

  const requestByCountry = useCallback(async () => {
    const coordsByCountry = await getCoordsByCountry(country);
    const countryArrayLength = coordsByCountry.data.results.length;
    const emptyCountryArray = countryArrayLength === 0;
    if (!emptyCountryArray) {
      setState(coordsByCountry.data);

      return;
    } else {
      setError(`Error, enter valid city, country or coords...`);
    }
  }, [country]);
  const renderMap = useCallback((state: MapAPIType) => {
    if (state || (state && (invalidCoords || noComma))) {
      const {lat, lng} = state.results[0].geometry.location;
      createMap(lat, lng);
    }

    if (!state && (coords && !isInvalidCoords)) {
      if (!noComma) {
        const [lat, lng] = coords.split(',');
        return createMap(+lat, +lng);
      }

      setError(`Error, enter valid coords with comma ' , '`);
    }

    // if (!state && (coords && !isInvalidCoords)) {
//   const commaNotFoundInSubstr = coords.indexOf(',') !== index;
//
//   if (commaNotFoundInSubstr) {
//     const [lat, lng] = coords.split(',');
//     const maxZenithPoint = 85;
//     const angleFromZenithToEquator = (
//       (+lat > -maxZenithPoint) && (+lat <= maxZenithPoint)
//     );
//
//     if (angleFromZenithToEquator) {
//       createMap(+lat, +lng);
//
//       return;
//     }
//   }
//
//   setError(`The latitude should be from -85 and to 85`);

  }, [coords, isInvalidCity, isInvalidCountry, isInvalidCoords, noComma]);


  // empty city and other attributes undefined
  // empty country and other attributes undefined
  // empty city and country and other attributes undefined


  useEffect(() => {
    (async () => {
      try {
        if (!city && !country && !coords) {
          setError(`Error, enter valid city, country or coords...`);
        }

        if (isInvalidCity && isInvalidCountry && notValidCoords) {
          setError(`Error, enter valid city, country or coords...`);
        }

        if (city) {
          if (city === invalidCity) {
            if (country && (country !== invalidCountry)) {
              await requestByCountry();
            }

            return;
          }

          const coordsByCity = await getCoordsByCity(city);
          const cityArrayLength = coordsByCity.data.results.length;
          const emptyCityArray = cityArrayLength === 0;

          if (!emptyCityArray) {
            setState(coordsByCity.data);

            return;
          }

          return;
        }

        if (country) {
            if (country !== invalidCountry) {
              await requestByCountry();
            }

            return;
        }

        return;
      } catch (e) {
        e.response && setError(e.response.data.error_message);
      }
    })();
  }, [city, coords, country, invalidCity, invalidCountry, requestByCountry]);

  useEffect(() => {
    renderMap(state);
  }, [renderMap, state]);

  if (error && ((!city || isInvalidCity) && (!country || isInvalidCountry))) {
    return <ErrorMessage errorMessage={error} />;
  }

  return <div id={'map'} style={{width: '100%', height: '100vh'}} />;
};
