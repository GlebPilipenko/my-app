import axios from 'axios';

const covidApi = axios.create({
  baseURL: `${process.env.REACT_APP_COVID_BASE_URL}`,
});

const getQueryParams = (query?: string) => {
  return `countries/${query}?strict=false&allowNull=true`;
};

export const getInfoByCovid = (country?: string) => covidApi
  .get<CovidAPIType>(getQueryParams(country));

type CountryInfoType = {
  _id: number;
  iso2: string;
  iso3: string;
  lat: number;
  long: number;
  flag: string;
};

export type CovidAPIType = {
  updated: number;
  country: string;
  countryInfo: CountryInfoType;
  cases: number;
  todayCases: number | null;
  deaths: number;
  todayDeaths: number | null;
  recovered: number;
  todayRecovered: number | null;
  active: number;
  critical: number | null;
  casesPerOneMillion: number;
  deathsPerOneMillion: number;
  tests: number;
  testsPerOneMillion: number;
  population: number;
  continent: string;
  oneCasePerPeople: number;
  oneDeathPerPeople: number;
  oneTestPerPeople: number;
  activePerOneMillion: number;
  recoveredPerOneMillion: number;
  criticalPerOneMillion: number | null;
};
