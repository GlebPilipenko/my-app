import React from 'react';
import {Weather} from './components/weather/Weather';
import style from './App.module.css';
import {News} from './components/news/News';

enum WidgetTitles {
    WeatherWidget = 'weather-widget',
    NewsWidget = 'news-widget',
}

type PropsType = {
    app?: WidgetTitles;
    city?: string;
    country?: string;
};

export const App: React.FC<PropsType> = (props) => {
    switch (props.app) {
        case `${WidgetTitles.WeatherWidget}`:
            return <div className={style.wrapper}>
                <Weather city={props.city} />
            </div>;
        case `${WidgetTitles.NewsWidget}`:
            return <div className={style.wrapper}>
                <News country={props.country} city={props.city} />
            </div>;
        default:
            return null;
    }
};
