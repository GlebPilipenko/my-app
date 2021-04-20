import React from 'react';
import {PropsType} from 'src/typings';
import {WidgetTitles} from 'src/enums';
import {News, Notes, Weather, MapContainer, GoogleSearchBox} from './widgets';

export const App: React.FC<PropsType> = ({
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
    case `${WidgetTitles.GoogleSearchBox}`:
      return <GoogleSearchBox />;
    default:
      return null;
  }
};
