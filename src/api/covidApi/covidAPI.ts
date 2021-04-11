import axios from 'axios';
import {CovidAPIType} from './typings';

const covidApi = axios.create(
  {baseURL: `${process.env.REACT_APP_COVID_BASE_URL}`}
);

const getQueryParams = (query: string) => {
  return `countries/${query}?strict=false&allowNull=true`;
};

export const getInfoByCovid = (country: string) => covidApi
  .get<CovidAPIType>(getQueryParams(country));
