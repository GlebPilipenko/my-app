import React from 'react'
import {Weather} from './components/weather/Weather'
import s from './App.module.css'

type PropsType = {
    app?: string
    city?: string
}

export const App: React.FC<PropsType> = (props ) => {
    enum WidgetTitles {
        WeatherWidget = 'weather-widget'
    }

    return <div className={s.wrapper}>
        {props.app === WidgetTitles.WeatherWidget && <div><Weather city={props.city}/></div>}
    </div>
}
