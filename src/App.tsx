import React from 'react';
import style from './App.module.css';
import {PropsType} from 'src/typings';
import {WidgetTitles} from 'src/enums';
import {News, Notes, Weather, Images} from './widgets';

export const App: React.FC<PropsType> = ({
  app,
  city,
  country,
  viewmode,
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
    case `${WidgetTitles.ImagesWidget}`:
      return <div className={style.wrapper}>
        <Images
          city={city}
          country={country}
          viewmode={viewmode}
        />
      </div>;
    default:
      return null;
  }
};
