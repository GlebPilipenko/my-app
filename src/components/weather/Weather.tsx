import React, {Dispatch, SetStateAction} from 'react';
import {WeatherAPIType} from '../../api/weatherAPI';
import {InformationOfCity} from '../informationOfCity/InformationOfCity';

type PropsType = {
    data: WeatherAPIType
}

export const Weather: React.FC<PropsType> = (props) => {
    return <InformationOfCity data={props.data}/>;
};