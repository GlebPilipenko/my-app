import {styles} from '../styles';
import {Loader} from '@googlemaps/js-api-loader';
import {getGoogleMapLoader} from 'src/services';

export const initMap = (lat: number, lng: number) => {
  let map;
  const apiKey = process.env.REACT_APP_MAP_API_KEY as  string;
  const loader = new Loader({apiKey});
  const loader = getGoogleMapLoader();

  loader.load().then(() => {
    map = new google.maps.Map(document.getElementById('map') as HTMLElement,
      {
        center: {
          lat, lng
        },
        zoom: 4,
        styles
      } as google.maps.MapOptions);

    new google.maps.Marker({position: {lat, lng}, map});
  });
};
