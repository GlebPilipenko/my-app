import {FC} from 'react';
import style from './App.module.css';
import {PropsType} from 'src/typings';
import {WidgetTitles} from 'src/enums';
import {News, Notes, Weather, MapContainer, CovidDiagram} from './widgets';

export const App: FC<PropsType> = ({
  app,
  city,
  coords,
  styles,
  country,
}) => {
  switch (app) {
    case `${WidgetTitles.WeatherWidget}`:
      return <Weather city={city} />;
    case `${WidgetTitles.NewsWidget}`:
      return <News country={country} city={city} />;
    case `${WidgetTitles.NotesWidget}`:
      return <Notes country={country} city={city} />;
    case `${WidgetTitles.MapWidget}`:
      return <MapContainer coords={coords} styles={styles} />;
    case `${WidgetTitles.CovidWidget}`:
      return <CovidDiagram country={country} />;
    default:
      return null;
  }
};
