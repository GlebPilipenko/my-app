import React from 'react';
import {DailyType, WeatherAPIType, WeatherType} from '../../api/weatherAPI';
import s from './InformationOfCity.module.css';

type PorpsType = {
    state: WeatherAPIType
}

export const InformationOfCity: React.FC<PorpsType> = (props) => {
    return <>
        <div className={s.information__wrapper}>
            <div className={s.info__container}>
                {props.state.daily.map((dailyObj: DailyType, index: number) => {
                    if (dailyObj.temp) {
                        return <div key={index} className={s.info__wrapper}>
                            <div className={s.info__block}>
                                <div className={s.info__block_top}>
                                    {`${props.state.timezone.substr(7)}
                                    ${new Date(dailyObj.dt * 1000).toString()
                                        .slice(0, 15)}`}
                                </div>
                                <div className={s.info__block_middle}>
                                    <img
                                        src={`https://openweathermap.org/img/w/${dailyObj
                                            .weather.map((el: WeatherType) => el.icon)}.png`}
                                        alt="weather"/>
                                    <span>
                                    {`${Math.floor(dailyObj.temp.day)}°`}
                                </span>
                                </div>
                                <div className={s.info__block_bottom}>
                                    {dailyObj.weather[0].description}
                                </div>
                            </div>
                        </div>;
                    }
                })}
            </div>
        </div>
    </>;
};