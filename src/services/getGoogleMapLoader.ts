import {Loader} from '@googlemaps/js-api-loader';

export const getGoogleMapLoader = () => {
  const apiKey = process.env.REACT_APP_MAP_API_KEY as  string;

  return new Loader({apiKey, libraries: ['places']})
};
