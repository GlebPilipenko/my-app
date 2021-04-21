import {FC} from 'react';
import {PropsType} from 'src/typings';
import {WidgetTitles} from 'src/enums';
import {
  News,
  Notes,
  Images,
  Weather,
  CovidDiagram,
  MapContainer,
} from './widgets';

export const App: FC<PropsType> = ({
  app,
  city,
  coords,
  styles,
  country,
  masonry,
  carousel,
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
    case `${WidgetTitles.ImagesWidget}`:
      return <Images
        city={city}
        country={country}
        masonry={masonry}
        carousel={carousel}
      />
    case `${WidgetTitles.CovidWidget}`:
      return <CovidDiagram country={country} />;
    default:
      return null;
  }
};
