import React from 'react';
import {useSelector} from 'react-redux';
import {RootStateType} from '../../data/store';
import {WeatherResponseType} from '../../api/weatherAPI';
import s from './InformationOfcity.module.css';
import {getTemperatureToCelsius} from '../../utils/СonvertTemperatureToCelsius';

export const InformationOfCity = () => {

    const data = useSelector<RootStateType, WeatherResponseType>(state => state.weather);

    return <>
        <div className={s.title__container}>
            <div className={s.title__wrapper}><h1 className={s.title}>{`${data.city.name}, ${data.city.country}`}</h1>
            </div>
        </div>
        <div className={s.info__container}>
            {data.list.map(obj => {
                if (obj.main.temp && obj.main.temp_max && obj.main.temp_min && obj.main.feels_like) {
                    return <div className={s.info__wrapper}>
                        <div className={s.info__block}>
                            <div className={s.info__block_top}>
                                <div>{obj.dt_txt.substr(5, 5).split('-').join('.')}</div>
                                <div>{obj.dt_txt.substr(10, 6).split('-').join('.')}</div>
                            </div>
                            <div className={s.info__block_middle}>
                                <img src={`https://openweathermap.org/img/w/${obj.weather.map(el => el.icon)}.png`}
                                     alt="weather"/>
                                <span>{getTemperatureToCelsius(obj.main.temp)}</span>
                            </div>
                            <div className={s.info__block_bottom}>
                                <span>{obj.weather[0].description.split('')[0].toUpperCase() + obj.weather[0].description.slice(1)}</span>
                            </div>
                        </div>
                    </div>;
                }
            })}
        </div>
    </>;
};