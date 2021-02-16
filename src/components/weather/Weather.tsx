import React, {ChangeEvent, useState} from 'react'
import {useDispatch} from 'react-redux'
import {getWeatherDataTC} from '../../data/weatherReducer/WeatherReducer'
import {Input} from '../input/Input'
import {Button} from '../button/Button'
import {InformationOfCity} from '../informationOfcity/InformationOfcity'

export const Weather = () => {

    const [value, setValue] = useState<string>('')
    const dispatch = useDispatch()

    const getData = () => {
        dispatch(getWeatherDataTC(value))
    }

    const changeValue = (e: ChangeEvent<HTMLInputElement>) => {
        setValue(e.currentTarget.value)
    }

    return <>
        <Input value={value} changeValue={changeValue}/>
        <Button getData={getData}/>
        <InformationOfCity/>
    </>
}