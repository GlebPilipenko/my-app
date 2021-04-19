import React from 'react';
import {App} from './App';
import ReactDOM from 'react-dom';
import reportWebVitals from './reportWebVitals';

const ROOT_SELECTORS = [
  '[data-app="map-widget"]',
  '[data-app="news-widget"]',
  '[data-app="notes-widget"]',
  '[data-app="weather-widget"]',
];

const getAppNodes = (selectors: string[]) => {
  const arrayOfArrays = selectors.map(selector => {
    return Array.prototype.slice.call(
      document.querySelectorAll(selector));
  });
  return arrayOfArrays
    .filter(nodes => !!nodes.length).flat();
};

const initApp = async (appRoot: HTMLElement) => {
  const props = appRoot.dataset;

  ReactDOM.render(
    <App {...props} />,
    appRoot
  );
};

const renderApp = (appRoots: HTMLElement[] = []) => {
  if (appRoots && appRoots.length > 0) {
    appRoots.forEach(initApp);
  }
};

renderApp(getAppNodes(ROOT_SELECTORS));

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
