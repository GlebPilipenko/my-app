import React from 'react';
import style from './App.module.css';
import {PropsType} from 'src/typings';
import {WidgetTitles} from 'src/enums';
import {News, Notes, Weather} from './widgets';

export const App: React.FC<PropsType> = ({
  app,
  city,
  country,
}) => {
  console.log(country);
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
      return <Notes country={country} city={city} />;
    default:
      return null;
  }
};
