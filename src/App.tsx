import React, {useEffect, useState} from 'react';
import {Weather} from './components/weather/Weather';
import s from './App.module.css';
import {weatherAPI, WeatherAPIType} from './api/weatherAPI';
import {News} from './components/news/News';

enum WidgetTitles {
    WeatherWidget = 'weather-widget',
    NewsWidget = 'news-widget',
}

type PropsType = {
    app?: WidgetTitles;
    coordinates?: string;
    city?: string;
    country?: string;
}

export const App: React.FC<PropsType> = (props) => {
    return <>
        {(function () {
            switch (props.app) {
                case `${WidgetTitles.WeatherWidget}`:
                    return <Weather coordinates={props.coordinates}/>;
                case `${WidgetTitles.NewsWidget}`:
                    return <News country={props.country} city={props.city}/>;
                default:
                    return null;
            }
        })()}
    </>;
};
