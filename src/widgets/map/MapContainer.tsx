import {FC, useCallback, useEffect, useState} from 'react';
import {initMap} from './utils';
import {PropsType} from './typings';
import {getCoordinates} from 'src/api/mapApi';
import {DefaultQueryParameters} from 'src/enums';
import {MapAPIType} from 'src/api/mapApi/typings';
import {ErrorMessage} from 'src/common/errorMessage';

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
    (!city || isInvalidCountry) || (!country || isInvalidCity)
  );
  const errorMessage = `
  Error, enter valid city or country, If no city and country enter valid coords,
  coordinates should be from -85 and to 85 and via the ' , '
  `;
  const coordsNoNumberCityCountry =
    coordsNoNumber &&
    lengthOfArrayCoords &&
    invalidCityAndCountry;

  const getCoords = useCallback(async (city: string, country: string) => {
    if (city && country) {
      const coordsByCity = await getCoordinates(city, country);
      const cityArrayLength = coordsByCity.data.results.length;

      if (cityArrayLength !== 0) {
        return setState(coordsByCity.data);
      } else {
        return setError(errorMessage);
      }
    } else {
      setError(errorMessage);
    }
  }, [errorMessage]);

  useEffect(() => {
      (async () => {
        try {
          if (allPropsInvalid || coordsNoNumberCityCountry) {
            return setError(errorMessage);
          }

          if (!lengthOfArrayCoords) {
            if (invalidCityAndCountry) {
              return setError(errorMessage);
            }

            if (city && country) {
              return await getCoords(city, country);
            }
          }

          if (coords && !coordsNoNumber && !isInvalidCoords) {
            const maxZenithPoint = 85;
            const angleFromZenithToEquator = (
              (+lat < maxZenithPoint) && (+lat > -maxZenithPoint)
            );

            if (!angleFromZenithToEquator) {
              if (city && country) {
                return await getCoords(city, country);
              }
            }

            if (angleFromZenithToEquator) {
              return initMap(+lat, +lng);
            } else {
              return setError(errorMessage);
            }
          }
        } catch (error) {
          const statusText = error.response.statusText;

          !error.response
            ? setError(`Request is blocked...`)
            : setError(
            statusText === `Not Found`
              ? errorMessage
              : statusText
            );
        }
      })();
    }, [city, coords, country, lat, lng, isInvalidCoords, errorMessage,
      allPropsInvalid, invalidCityAndCountry, lengthOfArrayCoords,
      coordsNoNumber, coordsNoNumberCityCountry, getCoords]
  );

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
