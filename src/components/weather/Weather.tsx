import React, {useEffect, useState} from 'react';
import {getWeather, WeatherAPIType} from '../../api/weatherAPI';
import {InformationOfCity} from '../informationOfCity/InformationOfCity';

type PropsType = {
    city?: string;
};

export const Weather: React.FC<PropsType> = (props) => {

    const [state, setState] = useState<null | WeatherAPIType>(null);

    useEffect(() => {
        (async () => {
            const res = await getWeather.weatherApi(props.city);
            setState(res.data);
        })();
    }, [props.city]);

    return <InformationOfCity state={state} />;
};
