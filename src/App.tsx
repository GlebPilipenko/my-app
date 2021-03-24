import React from 'react';
import style from './App.module.css';
import {PropsType} from 'src/typings';
import {WidgetTitles} from 'src/enums';
import {News, Notes, Weather, Map} from './widgets';

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
    case `${WidgetTitles.MapWidget}`:
      return <div className={style.wrapper}>
        <Map country={country} city={city} />
      </div>;
    default:
      return null;
  }
};
