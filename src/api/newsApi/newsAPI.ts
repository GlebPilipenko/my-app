import axios from 'axios';
import {NewsAPIType} from './typings';

const newsApi = axios.create({
  baseURL: `${process.env.REACT_APP_NEWS_BASE_URL}`
});

const apikey = process.env.REACT_APP_NEWS_API_KEY as string;

const getQueryParams = (query: string, apikey: string) => {
  return `everything?qInTitle="${query}"&language=en&pageSize=5&apiKey=${apikey}`;
};

export const getNewsCity = (city: string) => newsApi.get<NewsAPIType>(
  getQueryParams(city, apikey));

export const getNewsCountry = (country: string) => newsApi.get<NewsAPIType>(
  getQueryParams(country, apikey));
