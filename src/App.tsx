import React, {useEffect, useState} from 'react';
import {Weather} from './components/weather/Weather';
import s from './App.module.css';
import {weatherAPI, WeatherAPIType} from './api/weatherAPI';
import {News} from './components/news/News';

type PropsType = {
    app?: string
    coordinates?: string
    city?: string
    country?: string
}

export const App: React.FC<PropsType> = (props) => {

    enum WidgetTitles {
        WeatherWidget = 'weather-widget',
        NewsWidget = 'news-widget'
    }

    const [state, setState] = useState<WeatherAPIType>({
        lat: 0,
        lon: 0,
        timezone: '',
        timezone_offset: 0,
        current: {
            dt: 0,
            sunrise: 0,
            sunset: 0,
            temp: 0,
            feels_like: 0,
            pressure: 0,
            humidity: 0,
            dew_point: 0,
            uvi: 0,
            clouds: 0,
            visibility: 0,
            wind_speed: 0,
            wind_deg: 0,
            weather: [
                {
                    id: 0,
                    main: '',
                    description: '',
                    icon: ''
                }
            ]
        },
        daily: [
            {
                dt: 0,
                sunrise: 0,
                sunset: 0,
                temp: {
                    day: 0,
                    min: 0,
                    max: 0,
                    night: 0,
                    eve: 0,
                    morn: 0
                },
                feels_like: {
                    day: 0,
                    night: 0,
                    eve: 0,
                    morn: 0
                },
                pressure: 0,
                humidity: 0,
                dew_point: 0,
                wind_speed: 0,
                wind_deg: 0,
                weather: [
                    {
                        id: 0,
                        main: 'Clouds',
                        description: '',
                        icon: ''
                    }
                ],
                clouds: 0,
                pop: 0,
                uvi: 0
            },
        ]
    });

    useEffect(() => {
        (async function () {
            const res = await weatherAPI
                .getWeather(props.coordinates ? props.coordinates.split(',') : []);
            setState(res.data);
        })();
    }, []);

    return <div className={s.wrapper}>
        {
            // props.app === WidgetTitles.WeatherWidget && <div><Weather city={props.city}/></div>
            props.app === WidgetTitles.NewsWidget &&
            <div><News city={props.city} country={props.country}/></div>
        }
    </div>;
};
