import React from 'react';
import {Weather} from './widget/weather/Weather';
import style from './App.module.css';
import {News} from './widget/news/News';
import {Notes} from './widget/notes/Notes'

enum WidgetTitles {
    WeatherWidget = 'weather-widget',
    NewsWidget = 'news-widget',
    NotesWidget = 'notes-widget',
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
        case `${WidgetTitles.NotesWidget}`:
            return <div className={style.wrapper}>
                <Notes country={country} city={city} />
            </div>;
        default:
            return null;
    }
};
