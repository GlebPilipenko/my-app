import {FC, useEffect, useState} from 'react';
import {PropsType} from './typings';
import {MapAPIType} from 'src/api/mapApi/typings';
import {ErrorMessage} from 'src/common/errorMessage';
import {
  getCoordsByCity,
  getCoordsByCountry,
} from 'src/api/mapApi';

export const MapContainer: FC<PropsType> = ({
  city = 'invalid_city',
  coords = 'invalid_coords',
  country = 'invalid_country',
}) => {
  const [state, setState] = useState<any | MapAPIType>(null);
  const [error, setError] = useState<string>('');

  const invalidCity = 'invalid_city';
  const invalidCountry = 'invalid_country';
  const isInvalidCity = city === invalidCity;
  const isNotInvalidCountry = country !== invalidCountry;
  const allValuesIsInvalid = (
    city === invalidCity && country === invalidCountry
  );

  const createMap = (state: MapAPIType) => {
    debugger
    if (state) {
      const {lat, lng} = state.results[0].geometry.location;
      const map = new google.maps.Map(document.getElementById('map') as HTMLElement,
        {center: {lat, lng}, zoom: 4, styles: [
            {
              'elementType': 'geometry',
              'stylers': [
                {
                  'color': '#1d2c4d'
                }
              ]
            },
            {
              'elementType': 'labels.text.fill',
              'stylers': [
                {
                  'color': '#8ec3b9'
                }
              ]
            },
            {
              'elementType': 'labels.text.stroke',
              'stylers': [
                {
                  'color': '#1a3646'
                }
              ]
            },
            {
              'featureType': 'administrative.country',
              'elementType': 'geometry.stroke',
              'stylers': [
                {
                  'color': '#4b6878'
                }
              ]
            },
            {
              'featureType': 'administrative.land_parcel',
              'elementType': 'labels.text.fill',
              'stylers': [
                {
                  'color': '#64779e'
                }
              ]
            },
            {
              'featureType': 'administrative.province',
              'elementType': 'geometry.stroke',
              'stylers': [
                {
                  'color': '#4b6878'
                }
              ]
            },
            {
              'featureType': 'landscape.man_made',
              'elementType': 'geometry.stroke',
              'stylers': [
                {
                  'color': '#334e87'
                }
              ]
            },
            {
              'featureType': 'landscape.natural',
              'elementType': 'geometry',
              'stylers': [
                {
                  'color': '#023e58'
                }
              ]
            },
            {
              'featureType': 'poi',
              'elementType': 'geometry',
              'stylers': [
                {
                  'color': '#283d6a'
                }
              ]
            },
            {
              'featureType': 'poi',
              'elementType': 'labels.text.fill',
              'stylers': [
                {
                  'color': '#6f9ba5'
                }
              ]
            },
            {
              'featureType': 'poi',
              'elementType': 'labels.text.stroke',
              'stylers': [
                {
                  'color': '#1d2c4d'
                }
              ]
            },
            {
              'featureType': 'poi.park',
              'elementType': 'geometry.fill',
              'stylers': [
                {
                  'color': '#023e58'
                }
              ]
            },
            {
              'featureType': 'poi.park',
              'elementType': 'labels.text.fill',
              'stylers': [
                {
                  'color': '#3C7680'
                }
              ]
            },
            {
              'featureType': 'road',
              'elementType': 'geometry',
              'stylers': [
                {
                  'color': '#304a7d'
                }
              ]
            },
            {
              'featureType': 'road',
              'elementType': 'labels.text.fill',
              'stylers': [
                {
                  'color': '#98a5be'
                }
              ]
            },
            {
              'featureType': 'road',
              'elementType': 'labels.text.stroke',
              'stylers': [
                {
                  'color': '#1d2c4d'
                }
              ]
            },
            {
              'featureType': 'road.highway',
              'elementType': 'geometry',
              'stylers': [
                {
                  'color': '#2c6675'
                }
              ]
            },
            {
              'featureType': 'road.highway',
              'elementType': 'geometry.stroke',
              'stylers': [
                {
                  'color': '#255763'
                }
              ]
            },
            {
              'featureType': 'road.highway',
              'elementType': 'labels.text.fill',
              'stylers': [
                {
                  'color': '#b0d5ce'
                }
              ]
            },
            {
              'featureType': 'road.highway',
              'elementType': 'labels.text.stroke',
              'stylers': [
                {
                  'color': '#023e58'
                }
              ]
            },
            {
              'featureType': 'transit',
              'elementType': 'labels.text.fill',
              'stylers': [
                {
                  'color': '#98a5be'
                }
              ]
            },
            {
              'featureType': 'transit',
              'elementType': 'labels.text.stroke',
              'stylers': [
                {
                  'color': '#1d2c4d'
                }
              ]
            },
            {
              'featureType': 'transit.line',
              'elementType': 'geometry.fill',
              'stylers': [
                {
                  'color': '#283d6a'
                }
              ]
            },
            {
              'featureType': 'transit.station',
              'elementType': 'geometry',
              'stylers': [
                {
                  'color': '#3a4762'
                }
              ]
            },
            {
              'featureType': 'water',
              'elementType': 'geometry',
              'stylers': [
                {
                  'color': '#0e1626'
                }
              ]
            },
            {
              'featureType': 'water',
              'elementType': 'labels.text.fill',
              'stylers': [
                {
                  'color': '#4e6d70'
                }
              ]
            }
          ]});
      const marker = new google.maps.Marker(
        {position: {lat, lng}, map: map}
      );
    }

    if (!state && coords) {
      debugger
      const arrOfCoordinates = coords.split(',');
      const lat = +arrOfCoordinates[0];
      const lng = +arrOfCoordinates[1].trim();
      const map = new google.maps.Map(document.getElementById('map') as HTMLElement,
        {center: {lat, lng}, zoom: 4, styles: [
            {
              'elementType': 'geometry',
              'stylers': [
                {
                  'color': '#1d2c4d'
                }
              ]
            },
            {
              'elementType': 'labels.text.fill',
              'stylers': [
                {
                  'color': '#8ec3b9'
                }
              ]
            },
            {
              'elementType': 'labels.text.stroke',
              'stylers': [
                {
                  'color': '#1a3646'
                }
              ]
            },
            {
              'featureType': 'administrative.country',
              'elementType': 'geometry.stroke',
              'stylers': [
                {
                  'color': '#4b6878'
                }
              ]
            },
            {
              'featureType': 'administrative.land_parcel',
              'elementType': 'labels.text.fill',
              'stylers': [
                {
                  'color': '#64779e'
                }
              ]
            },
            {
              'featureType': 'administrative.province',
              'elementType': 'geometry.stroke',
              'stylers': [
                {
                  'color': '#4b6878'
                }
              ]
            },
            {
              'featureType': 'landscape.man_made',
              'elementType': 'geometry.stroke',
              'stylers': [
                {
                  'color': '#334e87'
                }
              ]
            },
            {
              'featureType': 'landscape.natural',
              'elementType': 'geometry',
              'stylers': [
                {
                  'color': '#023e58'
                }
              ]
            },
            {
              'featureType': 'poi',
              'elementType': 'geometry',
              'stylers': [
                {
                  'color': '#283d6a'
                }
              ]
            },
            {
              'featureType': 'poi',
              'elementType': 'labels.text.fill',
              'stylers': [
                {
                  'color': '#6f9ba5'
                }
              ]
            },
            {
              'featureType': 'poi',
              'elementType': 'labels.text.stroke',
              'stylers': [
                {
                  'color': '#1d2c4d'
                }
              ]
            },
            {
              'featureType': 'poi.park',
              'elementType': 'geometry.fill',
              'stylers': [
                {
                  'color': '#023e58'
                }
              ]
            },
            {
              'featureType': 'poi.park',
              'elementType': 'labels.text.fill',
              'stylers': [
                {
                  'color': '#3C7680'
                }
              ]
            },
            {
              'featureType': 'road',
              'elementType': 'geometry',
              'stylers': [
                {
                  'color': '#304a7d'
                }
              ]
            },
            {
              'featureType': 'road',
              'elementType': 'labels.text.fill',
              'stylers': [
                {
                  'color': '#98a5be'
                }
              ]
            },
            {
              'featureType': 'road',
              'elementType': 'labels.text.stroke',
              'stylers': [
                {
                  'color': '#1d2c4d'
                }
              ]
            },
            {
              'featureType': 'road.highway',
              'elementType': 'geometry',
              'stylers': [
                {
                  'color': '#2c6675'
                }
              ]
            },
            {
              'featureType': 'road.highway',
              'elementType': 'geometry.stroke',
              'stylers': [
                {
                  'color': '#255763'
                }
              ]
            },
            {
              'featureType': 'road.highway',
              'elementType': 'labels.text.fill',
              'stylers': [
                {
                  'color': '#b0d5ce'
                }
              ]
            },
            {
              'featureType': 'road.highway',
              'elementType': 'labels.text.stroke',
              'stylers': [
                {
                  'color': '#023e58'
                }
              ]
            },
            {
              'featureType': 'transit',
              'elementType': 'labels.text.fill',
              'stylers': [
                {
                  'color': '#98a5be'
                }
              ]
            },
            {
              'featureType': 'transit',
              'elementType': 'labels.text.stroke',
              'stylers': [
                {
                  'color': '#1d2c4d'
                }
              ]
            },
            {
              'featureType': 'transit.line',
              'elementType': 'geometry.fill',
              'stylers': [
                {
                  'color': '#283d6a'
                }
              ]
            },
            {
              'featureType': 'transit.station',
              'elementType': 'geometry',
              'stylers': [
                {
                  'color': '#3a4762'
                }
              ]
            },
            {
              'featureType': 'water',
              'elementType': 'geometry',
              'stylers': [
                {
                  'color': '#0e1626'
                }
              ]
            },
            {
              'featureType': 'water',
              'elementType': 'labels.text.fill',
              'stylers': [
                {
                  'color': '#4e6d70'
                }
              ]
            }
          ]});
      const marker = new google.maps.Marker(
        {position: {lat, lng}, map: map}
      );
    }
  };

  useEffect(() => {
    (async () => {
      try {
        if ((!city && country) || (isInvalidCity && isNotInvalidCountry)) {
          const coordsByCountry = await getCoordsByCountry(country);
          const arrayLength = coordsByCountry.data.results.length;

          if (arrayLength !== 0) {
            setState(coordsByCountry.data);
          }
        }

        if (city && city !== invalidCity) {
          const coordsByCity = await getCoordsByCity(city);
          const arrayLength = coordsByCity.data.results.length;

          if (arrayLength !== 0) {
            setState(coordsByCity.data);
          }

          if (arrayLength === 0) {
            const coordsByCountry = await getCoordsByCountry(country);
            const arrayLength = coordsByCountry.data.results.length;

            if (arrayLength !== 0) {
              setState(coordsByCountry.data);
            }
          }
        }

      } catch (e) {
        !e.response && setError(error
            ? `JSX - Please, enter correct city or country...`
            : `Your request is blocked`);
      }
    })();
  }, [
    city, coords, country,
    error, allValuesIsInvalid, isInvalidCity, isNotInvalidCountry
  ]);

  useEffect(() => {
    createMap(state);
  }, [createMap, state]);

  if (!state) {
    return <ErrorMessage
      errorMessage={error}
    />;
  }

  return <div id={'map'} style={{width: '100%', height: '100vh'}} />;
};
