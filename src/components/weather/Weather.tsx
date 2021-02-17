import React, {useEffect} from 'react'
import {useDispatch} from 'react-redux'
import {getWeatherDataTC} from '../../data/weatherReducer/WeatherReducer'
import {InformationOfCity} from '../informationOfcity/InformationOfcity'

export const Weather = (props: any) => {

    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(getWeatherDataTC(props.city))
    }, [])

    return <div>
        <InformationOfCity />
    </div>
}