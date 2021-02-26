import React, {useEffect, useState} from 'react';
import {getWeather, WeatherAPIType} from '../../api/weatherAPI';
import {InformationOfCity} from '../informationOfCity/InformationOfCity';
import style from './Weather.module.css';

type PropsType = {
    city?: string;
};

export const Weather: React.FC<PropsType> = ({city}) => {
    const [state, setState] = useState<null | WeatherAPIType>(null);
    const [error, setError] = useState<any>(null);

    useEffect(() => {
        (async () => {
            try {
                const res = await getWeather(city);
                if (res.data.list.length > 0) {
                    setState(res.data);
                }
            } catch (e) {
                !e.response
                    ? setError('Weather request error, please try again later')
                    : setError(e.response.data.message);
            }
        })();
    }, [city]);

    if (!state) {
        return (
            <div className={style.error__container}>
                <div className={style.error__block}>
                    {error}
                </div>
            </div>
        );
    }

    return <InformationOfCity state={state} />;
};
