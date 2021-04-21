export enum WidgetTitles {
  MapWidget = 'map-widget',
  NewsWidget = 'news-widget',
  NotesWidget = 'notes-widget',
  CovidWidget = 'covid-widget',
  ImagesWidget = `images-widget`,
  WeatherWidget = 'weather-widget',
}

export enum DefaultQueryParameters {
  InvalidCity = `invalidCity`,
  InvalidCoords = 'invalidCoords',
  InvalidCountry = 'invalidCountry',
  InvalidViewMode = `invalidViewMode`,
}

export enum ErrorMessages {
  ForMap = `Error, enter valid coords, coordinates should be from -85° and to
   85° and via the ' , '`,
}
