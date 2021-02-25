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

export const App: React.FC<PropsType> = (props) => (
    <div className={style.wrapper}>
        {(() => {
            switch (props.app) {
                case `${WidgetTitles.WeatherWidget}`:
                    return <Weather city={props.city} />;
                case `${WidgetTitles.NewsWidget}`:
                    return <News country={props.country} city={props.city} />;
                default:
                    return null;
            }
        })()}
    </div>
);
