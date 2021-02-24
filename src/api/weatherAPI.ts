import axios from 'axios';

const weatherApi = axios.create({
    baseURL: process.env.REACT_APP_WEATHER_BASE_URL,
});

const apikey = process.env.REACT_APP_WEATHER_API_KEY;

export const getWeather = {
    weatherApi(city: string | undefined) {
        return weatherApi.get<WeatherAPIType>(
            `forecast?q=${city}&units=metric&appid=${apikey}`
        );
    }
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
