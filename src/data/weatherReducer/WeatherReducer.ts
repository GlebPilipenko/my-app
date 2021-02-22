import {weatherAPI, WeatherResponseType} from '../../api/weatherAPI';
import {Dispatch} from 'redux';

const initState = {
    cod: '',
    message: '',
    cnt: 0,
    list: [{
        dt: 0,
        main: {
            temp: null as null | number,
            feels_like: null as null | number,
            temp_min: null as null | number,
            temp_max: null as null | number,
            pressure: 0,
            humidity: 0,
            sea_level: 0,
            grnd_level: 0,
            temp_kf: 0
        },
        weather: [{
            id: 0,
            main: '',
            description: '',
            icon: ''
        }],
        clouds: {all: 0},
        wind: {
            speed: 0,
            deg: 0
        },
        visibility: null as null | number,
        pop: 0,
        sys: {pop: ''},
        dt_txt: ''
    }],
    city: {
        id: 0,
        name: '',
        cord: {
            lon: 0,
            lat: 0
        },
        country: '',
        population: null as null | number,
        timezone: 0,
        sunrise: 0,
        sunset: 0,
    }
};

type InitStateType = typeof initState

export const weatherReducer = (state = initState, action: ActionsType): InitStateType => {
    switch (action.type) {
        case 'weather/GetWeatherData':
            const {cod, message, cnt, list, city} = action.data;
            return {
                ...state,
                // Object & Array
                list, city,
                // Primitives
                cod, message, cnt
            };
        default:
            return state;
    }
};

const actions = {
    getWeatherDataAC: (data: WeatherResponseType) => ({
        type: 'weather/GetWeatherData', data
    })
};

export const getWeatherDataTC = (city: string) => async (dispatch: Dispatch) => {
    const res = await weatherAPI.getWeather(city);
    dispatch(actions.getWeatherDataAC(res.data));
};

type ActionsType =
    | ReturnType<typeof actions.getWeatherDataAC>