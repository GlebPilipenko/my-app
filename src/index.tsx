import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import {App} from './App'
import reportWebVitals from './reportWebVitals'
import {Provider} from 'react-redux'
import {store} from './data/store'

ReactDOM.render(
    <Provider store={store}>
        <App/>
    </Provider>,
    document.getElementById('root')
)

const ROOT_SELECTORS = ['[data-app="weather-widget"]']

const getAppNodes = (selectors: string[]) => selectors
    .map(selector => Array.prototype.slice.call(document.querySelectorAll(selector)))
    .find(nodes => !!nodes.length)

const initApp = async (appRoot: HTMLElement) => {
    const props = appRoot.dataset

    ReactDOM.render(
        <Provider store={store}>
            <App {...props} />
        </Provider>,
        appRoot
    )
}

const renderApp = (appRoots: HTMLElement[] = []) => {
    if (appRoots && appRoots.length > 0) {
        appRoots.forEach(initApp)
    }
}

renderApp(getAppNodes(ROOT_SELECTORS))

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals()
