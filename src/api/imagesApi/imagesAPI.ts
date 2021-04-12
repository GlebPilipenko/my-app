import axios from 'axios';
import {ImagesAPIType} from './typings';

const imagesAPI = axios.create({
  baseURL: `${process.env.REACT_APP_IMAGES_BASE_URL}`
});

const typePhoto = `&image_type=photo`;
const apikey = process.env.REACT_APP_IMAGES_API_KEY as string;

const getQueryParams = (query: string, apikey: string, typePhoto: string) => (
  `?key=${apikey}&q=${query}&image_type=photo${typePhoto}&orientation=horizontal`
);

export const getImagesCity = (city: string) => imagesAPI.get<ImagesAPIType>(
  getQueryParams(city, apikey, typePhoto));

export const getImagesCountry = (country: string) => imagesAPI.get<ImagesAPIType>(
  getQueryParams(country, apikey, typePhoto));
