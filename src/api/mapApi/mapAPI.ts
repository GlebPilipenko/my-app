import axios from 'axios';
import {MapAPIType} from './typings';

const mapApi = axios.create({
  baseURL: `${process.env.REACT_APP_MAP_BASE_URL}`
});

const apikey = `${process.env.REACT_APP_MAP_API_KEY}`;

const getQueryParams = (city: string, country: string, apikey: string) => {
  return `json?address="${city} ${country}"&key=${apikey}`;
};

export const getCoordinates = (city: string, country: string) => mapApi
  .get<MapAPIType>(getQueryParams(city, country, apikey));
