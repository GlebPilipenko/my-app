import React from 'react';
import style from './App.module.css';
import {News} from './components/news/News';
import {Weather} from './components/weather/Weather';
import {ColumnarDiagram} from './components/covid/ColumnarDiagram';

enum WidgetTitles {
    WeatherWidget = 'weather-widget',
    NewsWidget = 'news-widget',
    CovidWidget = 'covid-widget',
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
        case `${WidgetTitles.CovidWidget}`:
            return <div className={style.wrapper}>
                <ColumnarDiagram country={country}/>
            </div>
        default:
            return null;
    }
};
