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

    if (emptyCountryArray && coords) {
      if (noComma) {
        setError(`Error, enter valid city, country or coords with comma ' , '`);
      }

      return;
    }

    if (!emptyCountryArray) {
      setState(coordsByCountry.data);
    } else {
      setError(`Error, enter valid city, country or coords...`);
    }
  }, [coords, country, noComma]);
  const renderMap = useCallback((state: MapAPIType) => {
    if (state) {
      const {lat, lng} = state.results[0].geometry.location;
      createMap(lat, lng);

      return;
    }

    if ((!state && !city && !country) || !noComma) {
      if (!noComma) {
        const [lat, lng] = coords.split(',');
        const maxZenithPoint = 85;
        const angleFromZenithToEquator = (
          (+lat > -maxZenithPoint) && (+lat <= maxZenithPoint)
        );

        if (angleFromZenithToEquator) {
          createMap(+lat, +lng);

          return;
        }
      }

      setError(
        `Error, enter valid city, country or coords, latitude should 
            be from -85 and to 85...`
      );
    }
  }, [city, coords, country, noComma]);

  useEffect(() => {
    (async () => {
      try {
        if ((!city || isInvalidCity) && (!country || isInvalidCountry) && (!coords || notValidCoords)) {
          setError(
            `Error, enter valid city, country or coords, latitude should 
            be from -85 and to 85...`
          );

          return;
        }

        if (city) {
          const coordsByCity = await getCoordsByCity(city);
          const cityArrayLength = coordsByCity.data.results.length;
          const emptyCityArray = cityArrayLength === 0;

          if (!emptyCityArray) {
            setState(coordsByCity.data);

            return;
          }

          if (country) {
            await requestByCountry();
          }

          return;
        }

        if (country) {
          await requestByCountry();
        }
      } catch (e) {
        e.response && setError(e.response.data.error_message);
      }
    })();
  }, [city, coords, country, isInvalidCity, isInvalidCoords, isInvalidCountry,
    noComma, notValidCoords, requestByCountry]);

  useEffect(() => {
    renderMap(state);
  }, [state, renderMap]);

  if (error) {
      return <ErrorMessage errorMessage={error} />;
  }

  return <div id={'map'} style={{width: '100%', height: '100vh'}} />;
};
