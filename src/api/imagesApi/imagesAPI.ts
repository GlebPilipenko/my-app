import axios from 'axios';
import {ImagesAPIType} from './typings';

const imagesAPI = axios.create({
  baseURL: `${process.env.REACT_APP_IMAGES_BASE_URL}`
});

const apikey = process.env.REACT_APP_IMAGES_API_KEY as string;

const getQueryParams = (firstQueryParam: string, secondQueryParam: string,
  apikey: string, isFirstRender: boolean, portion: string, page?: string
) => {
  if (!isFirstRender) {
    return `?key=${apikey}&q=${firstQueryParam}%20${
      secondQueryParam}&image_type=photo&per_page=${portion}&page=${page}`
  }

  return `?key=${apikey}&q=${firstQueryParam}%20${
    secondQueryParam}&image_type=photo&per_page=${portion}`;
};

export const getImages = (
  city: string, country: string, isFirstRender: boolean, portion: string, page?: string
) => imagesAPI.get<ImagesAPIType>(
  getQueryParams(city, country, apikey, isFirstRender, portion, page)
);
