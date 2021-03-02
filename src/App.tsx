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

export const App: React.FC<PropsType> = ({
    app,
    city,
    country,
}) => {
    switch (app) {
        case `${WidgetTitles.WeatherWidget}`:
            return <div className={style.wrapper}>
                <Weather city={city} />
            </div>;
        case `${WidgetTitles.NewsWidget}`:
            return <div className={style.wrapper}>
                <News country={country} city={city} />
            </div>;
        default:
            return null;
    }
};
