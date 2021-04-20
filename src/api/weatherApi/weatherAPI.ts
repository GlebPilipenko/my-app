import axios from 'axios';
import {WeatherAPIType} from './typings';

const weatherApi = axios.create({
  baseURL: process.env.REACT_APP_WEATHER_BASE_URL
});

const apikey = process.env.REACT_APP_WEATHER_API_KEY as string;

const getQuery = (city: string, apikey: string) => (
  `forecast?q=${city}&units=metric&appid=${apikey}`
);

export const getWeather = (city: string) => weatherApi
  .get<WeatherAPIType>(getQuery(city, apikey));
