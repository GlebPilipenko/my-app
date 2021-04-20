import axios from 'axios';
import {ImagesAPIType} from './typings';

const imagesAPI = axios.create({
  baseURL: `${process.env.REACT_APP_IMAGES_BASE_URL}`
});

const apikey = process.env.REACT_APP_IMAGES_API_KEY as string;

const getQueryParams = (
  query1: string = '', query2: string, apikey: string
) => (
  `?key=${apikey}&q=${query1}%20${query2}&image_type=photo&per_page=10`
);

export const getImagesCity = (city: string) => imagesAPI.get<ImagesAPIType>(
  getQueryParams('',city, apikey));

export const getImagesCountry = (country: string) => imagesAPI.get<ImagesAPIType>(
  getQueryParams('', country, apikey));

export const getImages = (city: string, country: string) => imagesAPI.get<ImagesAPIType>(
  getQueryParams(city, country, apikey));
