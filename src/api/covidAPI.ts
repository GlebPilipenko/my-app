import axios from 'axios';

const newsApi = axios.create({
    baseURL: `${process.env.REACT_APP_COVID_BASE_URL}`,
});

const getQueryParams = (query: string | undefined) => {
    return `countries/${query}?strict=false&allowNull=true`;
};

export const getNewsCountry = (country: string | undefined) => newsApi
    .get<CovidAPIType>(getQueryParams(country));

type CountryinfoType = {
    _id: number;
    iso2: string;
    iso3: string;
    lat: number;
    long: number;
    flag: string;
};

type CovidAPIType = {
    updated: number;
    country: string;
    countryInfo: CountryinfoType;
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
