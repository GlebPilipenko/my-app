import React from 'react';
import {News} from './widgets';
import {Notes} from './widgets';
import {Weather} from './widgets';
import {PropsType} from './typings';
import {WidgetTitles} from './enums';
import style from './App.module.css';

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
