import axios from 'axios';

const weatherApi = axios.create({
    baseURL: process.env.REACT_APP_WEATHER_BASE_URL,
});

const apikey = process.env.REACT_APP_WEATHER_API_KEY;

const getQuery = (city: string | undefined, apikey: string | undefined) => {
    return `forecast?q=${city}&units=metric&appid=${apikey}`;
};

export const getWeather = (city: string | undefined) => weatherApi.get<WeatherAPIType>(getQuery(city, apikey));

type MainType = {
    temp: number;
    feels_like: number;
    temp_min: number;
    temp_max: number;
    pressure: number;
    sea_level: number;
    grnd_level: number;
    humidity: number;
    temp_kf: number;
};

export type WeatherType = {
    id: number;
    main: string;
    description: string;
    icon: string;
};

type CityType = {
    id: number;
    name: string;
    coord: {
        lat: number;
        lon: number;
    },
    country: string;
    population: number;
    timezone: number;
    sunrise: number;
    sunset: number;
};

export type ListType = {
    dt: string;
    main: MainType;
    weather: WeatherType[];
    clouds: {
        all: number;
    },
    wind: {
        speed: number;
        deg: number;
    },
    visibility: number;
    pop: number;
    sys: {
        pod: string;
    },
    dt_txt: string;
};

export type WeatherAPIType = {
    cod: string;
    message: number;
    cnt: number;
    list: ListType[];
    city: CityType;
};
