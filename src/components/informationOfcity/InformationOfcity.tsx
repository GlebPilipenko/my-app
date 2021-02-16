import React from 'react'
import {useSelector} from 'react-redux'
import {RootStateType} from '../../data/store'
import {WeatherResponseType} from '../../api/weatherAPI'

export const InformationOfCity = () => {

    const data = useSelector<RootStateType, WeatherResponseType>(state => state.weather)

    return <div>
        <div>
            <h3>Place</h3>
            <div>Country: {data.city.country}</div>
            <div>City: {data.city.name}</div>
            <div>Population: {data.city.population}</div>
        </div>
        <div>
            <h3>Information</h3>
            {data.list.map(obj => {
                if (obj.main.temp && obj.main.temp_max && obj.main.temp_min && obj.main.feels_like) {
                    return <div>
                        <span>Date: {obj.dt_txt}</span>
                        <ul>
                            <li><span>Temperature now: {Math.floor(obj.main.temp - 273)}°C</span></li>
                            <li><span>Max temperature: {Math.floor(obj.main.temp_max - 273)}°C</span></li>
                            <li><span>Min temperature: {Math.floor(obj.main.temp_min - 273)}°C</span></li>
                            <li><span>Feels like: {Math.floor(obj.main.feels_like - 273)}°C</span></li>
                            <li><span>Sky: {obj.weather[0].main}</span></li>
                            <li><span>Description: {obj.weather[0].description}</span></li>
                            <li><span>Visibility: {obj.visibility} meters</span></li>
                        </ul>
                    </div>
                }
            })}
        </div>
    </div>
}