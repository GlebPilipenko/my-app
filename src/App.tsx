import React, {useEffect, useState} from 'react';
import {Weather} from './components/weather/Weather';
import s from './App.module.css';
import {weatherAPI, WeatherAPIType} from './api/weatherAPI';

type PropsType = {
    app?: string
    coordinates?: string
}

export const App: React.FC<PropsType> = (props) => {

    enum WidgetTitles {
        WeatherWidget = 'weather-widget'
    }

    return <div className={s.wrapper}>
        {props.app === WidgetTitles.WeatherWidget && <Weather coordinates={props.coordinates}/>}
    </div>;
};
