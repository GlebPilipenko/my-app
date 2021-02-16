import axios from 'axios'

const instance = axios.create({
    baseURL: `https://api.openweathermap.org/data/2.5/`,
})

export const weatherAPI = {
    getWeather(city: string) {
        return instance.get<WeatherResponseType>(`forecast?lang=ru&q=${city}&appid=c0aad8686833a90e780aed90426bd795`)
    }
}

// https://api.openweathermap.org/data/2.5/forecast?q=Minsk&appid=c0aad8686833a90e780aed90426bd795

type CoordType = {
    lon: number
    lat: number
}

type CityType = {
    id: number
    name: string
    cord: CoordType
    country: string
    population: null | number
    timezone: number
    sunrise: number
    sunset: number
}

type WindType = {
    speed: number
    deg: number
}

type WeatherType = {
    id: number
    main: string
    description: string
    icon: string
}

type MainType = {
    temp:  null | number
    feels_like:  null | number
    temp_min: null | number
    temp_max: null | number
    pressure: number
    humidity: number
    sea_level: number
    grnd_level: number
    temp_kf: number
}

type ListType = {
    dt: number
    main: MainType
    weather: WeatherType[]
    clouds: { all: number }
    wind: WindType
    visibility: null | number
    pop: number
    sys: { pop: string }
    dt_txt: string
}

// Full Type
export type WeatherResponseType = {
    cod: string
    message: string
    cnt: number
    list: ListType[]
    city: CityType
}