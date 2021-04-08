import {Loader} from '@googlemaps/js-api-loader';

export const getGoogleMapLoader = () => {
  return new Loader({
    apiKey: 'AIzaSyD4BdUK5hAfpPqFPZ-WDvUsxF339VKMz3s',
    libraries: ['places'],
  })
};
