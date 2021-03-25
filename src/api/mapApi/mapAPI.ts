import axios from 'axios';
import {MapAPIType} from './typings';

const mapApi = axios.create({
  baseURL: `${process.env.REACT_APP_MAP_BASE_URL}`
});

const apikey = `${process.env.REACT_APP_MAP_API_KEY}`;

const getQueryParams = (query: string, apikey: string) => {
  return `json?address=${query}&key=${apikey}`;
};

export const getCoordsByCity = (city: string) => mapApi.get<MapAPIType>(
  getQueryParams(city, apikey));

export const getCoordsByCountry = (country: string) => mapApi.get<MapAPIType>(
  getQueryParams(country, apikey));
