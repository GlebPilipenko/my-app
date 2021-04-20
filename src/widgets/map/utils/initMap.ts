import {styles} from '../styles';
import {getGoogleMapLoader} from 'src/services';

export const initMap = (lat: number, lng: number) => {
  let map;
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
