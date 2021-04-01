import {FC, useCallback, useEffect, useState} from 'react';
import {initMap} from './utils';
import {PropsType} from './typings';
import {DefaultQueryParameters} from 'src/enums';
import {MapAPIType} from 'src/api/mapApi/typings';
import {ErrorMessage} from 'src/common/errorMessage';
import {getCoordsByCity, getCoordsByCountry} from 'src/api/mapApi';

export const MapContainer: FC<PropsType> = ({
  city = DefaultQueryParameters.InvalidCity,
  coords = DefaultQueryParameters.InvalidCoords,
  country = DefaultQueryParameters.InvalidCountry
}) => {
  const [state, setState] = useState<any | MapAPIType>(null);
  const [error, setError] = useState<string>('');

  const [lat, lng] = coords.split(',');
  const lengthOfArrayCoords = coords.split(',').length === 2;

  const invalidCity = DefaultQueryParameters.InvalidCity;
  const invalidCoords = DefaultQueryParameters.InvalidCoords;
  const invalidCountry = DefaultQueryParameters.InvalidCountry;
  const isInvalidCity = (city === invalidCity);
  const isInvalidCoords = (coords === invalidCoords);
  const isInvalidCountry = (country === invalidCountry);

  const coordsNoNumber = (!isFinite(+lat) || !isFinite(+lng));
  const allPropsInvalid = (
    (!city || isInvalidCity) &&
    (!coords || isInvalidCoords) &&
    (!country || isInvalidCountry)
  );
  const invalidCityAndCountry = (
    (!city || isInvalidCountry) && (!country || isInvalidCity)
  );
  const errorMessage = `Error, enter valid city, country or coords, 
  coordinates should be from -85 and to 85 and via the ' , '`;

  const getCoordsWithCountry = useCallback(async (country: string) => {
    const coordsByCountry = await getCoordsByCountry(country);
    const countryArrayLength = coordsByCountry.data.results.length;
    const emptyCountryArray = countryArrayLength === 0;

    if (!emptyCountryArray) {
      return setState(coordsByCountry.data);
    }

    setError(errorMessage);
  }, [errorMessage]);
  const getCoords = useCallback(async (city: string, country: string) => {
    if (!city) {
     return await getCoordsWithCountry(country);
    }

    const coordsByCity = await getCoordsByCity(city);
    const cityArrayLength = coordsByCity.data.results.length;
    const emptyCityArray = cityArrayLength === 0;

    if (!emptyCityArray) {
      return setState(coordsByCity.data);
    } else {
      await getCoordsWithCountry(country);
    }
  }, [getCoordsWithCountry]);

  useEffect(() => {
    (async () => {
      try {
        if (allPropsInvalid) {
          return setError(errorMessage);
        }

        if (!lengthOfArrayCoords) {
          if (!city && !country) {
            return setError(errorMessage);
          }

          if (city || country) {
            return await getCoords(city, country);
          }
        }

        if (coords && !coordsNoNumber && !isInvalidCoords) {
          const maxZenithPoint = 85;
          const angleFromZenithToEquator = (
            (+lat < maxZenithPoint) && (+lat > -maxZenithPoint)
          );

          if (!angleFromZenithToEquator) {
            if (city || country) {
              return await getCoords(city, country);
            }
          }

          if (angleFromZenithToEquator) {
            return initMap(+lat, +lng);
          } else {
            return setError(errorMessage);
          }
        }

        if (city || country) {
          return await getCoords(city, country);
        }
      } catch (error) {
        !error.response
          ? setError(`Request is blocked...`)
          : setError(error.response.message);
      }
    })();
  }, [city, coords, country, lat, lng, isInvalidCoords, errorMessage,
    isInvalidCity, allPropsInvalid, coordsNoNumber, invalidCityAndCountry,
    lengthOfArrayCoords, getCoords]);

  useEffect(() => {
    if (state) {
      const {lat, lng} = state.results[0].geometry.location;
      initMap(+lat, +lng);
    }
  }, [state]);

  if (error) {
    return <ErrorMessage errorMessage={error} />;
  }

  return <div id={'map'} style={{width: '100%', height: '100vh'}} />;
};
