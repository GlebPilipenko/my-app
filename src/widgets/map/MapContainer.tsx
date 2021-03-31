import {FC, useEffect, useState} from 'react';
import {initMap} from './utils';
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

  const [lat, lng] = coords.split(',');
  const lengthOfArrayCoords = coords.split(',').length === 2;

  const invalidCity = DefaultQueryParameters.InvalidCity;
  const invalidCoords = DefaultQueryParameters.InvalidCoords;
  const invalidCountry = DefaultQueryParameters.InvalidCountry;

  const isInvalidCity = (city === invalidCity);
  const isInvalidCoords = (coords === invalidCoords);
  const isInvalidCountry = (country === invalidCountry);


  const invalidCityAndCountry = (
    (!city || isInvalidCountry) && (!country || isInvalidCity)
  );
  const coordsNoNumber = (!isFinite(+lat) || !isFinite(+lng));
  const allPropsInvalid = (
    (!city || isInvalidCity) &&
    (!coords || isInvalidCoords) &&
    (!country || isInvalidCountry)
  );

  useEffect(() => {
    (async () => {
      try {
        if (allPropsInvalid) {
          return setError(`Error, enter correct city, country or coords...`);
        }

        if (coordsNoNumber && invalidCityAndCountry && lengthOfArrayCoords) {
          return setError(`Coords not a number...`);
        }

        if (coords && !isInvalidCoords) {
          const maxZenithPoint = 85;
          const angleFromZenithToEquator = (
            (+lat > -maxZenithPoint) && (+lat <= maxZenithPoint)
          );

          if (angleFromZenithToEquator) {
            return initMap(+lat, +lat);
          } else {
            setError(
              `Error, enter valid city, country or coords, latitude should
            be from -85 and to 85...`
            );
          }

          return;
        }

        if (city) {
          const coordsByCity = await getCoordsByCity(city);
          const cityArrayLength = coordsByCity.data.results.length;
          const emptyCityArray = cityArrayLength === 0;
          if (!emptyCityArray) {
            return setState(coordsByCity.data);
          }
        }

        if (country && !isInvalidCountry) {
          const coordsByCountry = await getCoordsByCountry(country);
          const countryArrayLength = coordsByCountry.data.results.length;
          const emptyCountryArray = countryArrayLength === 0;

          if (!emptyCountryArray) {
            return setState(coordsByCountry.data);
          }
        }
      } catch (error) {
        console.log(error);
      }
    })();
  }, [lat, lng, city, coords, country,
    allPropsInvalid, coordsNoNumber, invalidCityAndCountry, lengthOfArrayCoords
  ]);

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
