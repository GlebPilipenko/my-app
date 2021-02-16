import {applyMiddleware, combineReducers, createStore} from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension'
import thunk from 'redux-thunk'
import { weatherReducer } from './weatherReducer/WeatherReducer'

export type RootStateType = ReturnType<typeof reducers>

const reducers = combineReducers({
    weather: weatherReducer
})

export let store = createStore(reducers, composeWithDevTools(applyMiddleware(thunk)))

// @ts-ignore
window.store = store
export default store