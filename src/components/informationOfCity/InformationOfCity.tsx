import React from 'react';
import {ListType, WeatherAPIType, WeatherType} from '../../api/weatherAPI';
import style from './InformationOfCity.module.css';

type PropsType = {
    state: WeatherAPIType | null;
};

export const InformationOfCity: React.FC<PropsType> = ({ state }) => {
    const oneThousand = 1000;
    const url = process.env.REACT_APP_WEATHER_IMG_URL_CITY;
    const noonTime = '12:00:00';

    if (!state) {
        return null;
    }

    const getFormatedDate = (date: Date) => {
        const mm = date.getMonth() + 1;
        const yyyy = date.getFullYear();
        let dd = date.getDate();

        return `${mm}/${dd}/${yyyy}`;
    };

    return (
        <div className={style.information__wrapper}>
            <div className={style.info__container}>
                {state.list.map((list: ListType, index: number) => {
                    const time = list.dt_txt.split(' ')[1];

                    if (time !== noonTime) {
                        return null;
                    }

                    return (
                        <div key={index} className={style.info__wrapper}>
                            <div className={style.info__block}>
                                <div className={style.info__block_top}>
                                    {state.city.name}
                                    <br />
                                    {getFormatedDate(new Date(+list.dt * oneThousand))}
                                </div>
                                <div className={style.info__block_middle}>
                                    <img
                                        src={`${url}${list.weather.map(
                                            (obj: WeatherType) => obj.icon)}.png`
                                        }
                                        alt="weather"
                                    />
                                    <span>
                                        {`${Math.floor(list.main.feels_like)}°`}
                                    </span>
                                </div>
                                <div className={style.info__block_bottom}>
                                    {`${list.weather[0].description[0]
                                        .toUpperCase()}${list.weather[0]
                                        .description.slice(1)}`}
                                </div>
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};
