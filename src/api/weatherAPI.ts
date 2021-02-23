import axios from 'axios';

const instance = axios.create({
    baseURL: `https://api.openweathermap.org/data/2.5/`,
});

export const weatherAPI = {
    getWeather(coordinates: string[]) {
        return instance
            .get<WeatherAPIType>(
                `onecall?lang=ru&lat=${coordinates[0]}&lon=${coordinates[1].trim()}&units=metric&exclude=minutely,hourly&appid=37d6a339766026bb63f314e133d07998`);
    }
};

type CoordType = {
    lon: number
    lat: number
}

type CurrentType = {
    dt: number,
    sunrise: number,
    sunset: number,
    temp: number,
    feels_like: number,
    pressure: number,
    humidity: number,
    dew_point: number,
    uvi: number,
    clouds: number,
    visibility: number,
    wind_speed: number,
    wind_deg: number
    weather: WeatherType[]
}

export type WeatherType = {
    id: number,
    main: string,
    description: string,
    icon: string
}

export type DailyType = {
    dt: number,
    sunrise: number,
    sunset: number,
    temp: TempType,
    feels_like: Feels_LikeType,
    pressure: number,
    humidity: number,
    dew_point: number,
    wind_speed: number,
    wind_deg: number,
    weather: WeatherType[]
    clouds: number,
    pop: number,
    uvi: number
}

type TempType = {
    day: number,
    min: number,
    max: number,
    night: number,
    eve: number,
    morn: number
}

type Feels_LikeType = {
    day: number,
    night: number,
    eve: number,
    morn: number
}

export type WeatherAPIType = {
    lat: number,
    lon: number,
    timezone: string,
    timezone_offset: number,
    current: CurrentType,
    daily: [
        {
            dt: number,
            sunrise: number,
            sunset: number,
            temp: TempType,
            feels_like: Feels_LikeType,
            pressure: number,
            humidity: number,
            dew_point: number,
            wind_speed: number,
            wind_deg: number,
            weather: WeatherType[]
            clouds: number,
            pop: number,
            uvi: number
        },
    ]
};