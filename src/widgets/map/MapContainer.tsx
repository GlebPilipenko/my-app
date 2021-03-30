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
    const invalidCoords = (!coords || isInvalidCoords || noComma);

    if (state || (state && invalidCoords)) {
      const {lat, lng} = state.results[0].geometry.location;
      createMap(lat, lng);
    }

    if (!state && (coords && !isInvalidCoords)) {

      // I think this not good code...

      if (!noComma) {
        const [lat, lng] = coords.split(',');
          createMap(+lat, +lng);
      }
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

  }, [coords, isInvalidCoords, noComma]);

  useEffect(() => {
    (async () => {
      try {
        if (cityAndCountryIsInvalid && noComma) {
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
          const emptyCityArray = cityArrayLength === 0;

          if (!emptyCityArray) {
            setState(coordsByCity.data);

            return;
          }

          if (emptyCityArray && (!country || isInvalidCountry) && noComma) {
            setError(`Enter valid city, country or coords with ' , '`);
          }

          if (emptyCityArray && (country !== invalidCountry && !country)) {
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
  }, [city, coords, country, isInvalidCity, invalidCountry, noComma,
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
