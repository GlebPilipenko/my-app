import React from 'react'
import {Weather} from './components/weather/Weather'
import s from './App.module.css'
import { News } from './components/news/News'

type PropsType = {
    app?: string
    city?: string
    country?: string
}

export const App: React.FC<PropsType> = (props) => {

    enum WidgetTitles {
        WeatherWidget = 'weather-widget',
        NewsWidget = 'news-widget'
    }

    return <div className={s.wrapper}>
        {
            // props.app === WidgetTitles.WeatherWidget && <div><Weather city={props.city}/></div>
            props.app === WidgetTitles.NewsWidget && <div><News city={props.city} country={props.country}/></div>
        }
    </div>
}
