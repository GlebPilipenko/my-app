import React from 'react';
import {ListType, WeatherAPIType, WeatherType} from '../../api/weatherAPI';
import style from './InformationOfCity.module.css';
import {getFormattedDate} from '../../utils/getFormattedDate';

type PropsType = {
    state: WeatherAPIType | null;
};

export const InformationOfCity: React.FC<PropsType> = ({state}) => {
    const url = process.env.REACT_APP_WEATHER_IMG_URL_CITY;
    const noonTime = '12:00:00';

    if (!state) {
        return null;
    }

    return (
        <div className={style.information__wrapper}>
            <div className={style.info__container}>
                {state.list.map((list: ListType, index: number) => {
                    const time = list.dt_txt.split(' ')[1];

                    if (time !== noonTime) {
                        return null;
                    }

                    const iconQuery = list.weather.map((obj: WeatherType) => {
                        return `${obj.icon}.png`;
                    });
                    const temperature = `${Math.floor(list.main.feels_like)}°`;
                    const sentence = list.weather[0].description;
                    const description = `${sentence[0]
                        .toUpperCase()}${sentence.slice(1)}`;

                    return (
                        <div key={index} className={style.info__wrapper}>
                            <div className={style.info__block}>
                                <div className={style.info__block_top}>
                                    {state.city.name}
                                    <br />
                                    {getFormattedDate(list.dt)}
                                </div>
                                <div className={style.info__block_middle}>
                                    <img src={`${url}${iconQuery}`}
                                         alt="weather" />
                                    <span>{temperature}</span>
                                </div>
                                <div className={style.info__block_bottom}>
                                    {description}
                                </div>
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};
