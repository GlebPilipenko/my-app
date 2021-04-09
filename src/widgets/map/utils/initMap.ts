import {Loader} from '@googlemaps/js-api-loader';

const styles = require('../json/GoogleMapStyles.json');

export const initMap = (lat: number, lng: number) => {
  let map;
  const loader = new Loader({apiKey: 'AIzaSyD4BdUK5hAfpPqFPZ-WDvUsxF339VKMz3s'});

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
