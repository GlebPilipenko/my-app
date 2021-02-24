import React from 'react';
import {ListType, WeatherAPIType, WeatherType} from '../../api/weatherAPI';
import style from './InformationOfCity.module.css';

type PorpsType = {
    state: WeatherAPIType | null;
};

export const InformationOfCity: React.FC<PorpsType> = (props) => {

    const oneThousand = 1000;
    const url = process.env.REACT_APP_WEATHER_IMG_URL_CITY;

    return <>
        {props.state ? <div className={style.information__wrapper}>
                <div className={style.info__container}>
                    {props.state.list.map((list: ListType, index: number) => {
                            const time = list.dt_txt.slice(11);
                            if (time === '12:00:00') {
                                return <div key={index}
                                            className={style.info__wrapper}>
                                    <div className={style.info__block}>
                                        <div className={style.info__block_top}>
                                            {props.state &&
                                            `${props.state.city.name} `}
                                            {new Date(+list.dt * oneThousand)
                                                .toString().slice(0, 15)}
                                        </div>
                                        <div className={style.info__block_middle}>
                                            <img src={
                                                `${url}${list.weather.map(
                                                    (obj: WeatherType) => obj.icon)}.png`}
                                                 alt="weather" />
                                            <span>
                                                {`${Math.floor(
                                                    list.main.feels_like
                                                )}°`}
                                            </span>
                                        </div>
                                        <div className={style.info__block_bottom}>
                                            {`${list.weather[0].description[0]
                                                .toUpperCase()}${list.weather[0]
                                                .description.slice(1)}`}
                                        </div>
                                    </div>
                                </div>;
                            } else {
                                return null;
                            }
                        }
                    )}
                </div>
            </div>
            : null}
    </>;
};
