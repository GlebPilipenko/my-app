import React from 'react';
import style from './App.module.css';
import {PropsType} from 'src/typings';
import {WidgetTitles} from 'src/enums';
import {News, Notes, Weather, MapContainer, GoogleSearchBox} from './widgets';

export const App: React.FC<PropsType> = ({
   app,
   city,
   coords,
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
    case `${WidgetTitles.MapWidget}`:
      return <div className={style.wrapper}>
        <MapContainer country={country} city={city} coords={coords} />
      </div>;
    case `${WidgetTitles.GoogleSearchBox}`:
      return <div className={style.wrapper}>
        <GoogleSearchBox />
      </div>;
    default:
      return null;
  }
};
