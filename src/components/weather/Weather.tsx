import React, {useEffect, useState} from 'react';
import {getWeather, WeatherAPIType} from '../../api/weatherAPI';
import {ErrorMessage} from '../common/errorMessage/ErrorMessage';
import {InformationOfCity} from '../informationOfCity/InformationOfCity';

type PropsType = {
    city?: string;
};

export const Weather: React.FC<PropsType> = ({city}) => {
    const [state, setState] = useState<null | WeatherAPIType>(null);
    const [error, setError] = useState<any>(null);
    const getErrorMessage = (error: string) => {
        const message = `${error[0].toUpperCase()}${error.slice(1)}`;

        if (message === 'Nothing to geocode') {
            return 'Enter the correct city.';
        }
        if (message === 'Bad query') {
            return 'There are no attributes for correct display.';
        }

        return message;
    };

    useEffect(() => {
        (async () => {
            try {
                const res = await getWeather(city);
                setState(res.data);
            } catch (e) {
                !e.response
                    ? setError('Weather request error, please try again later.')
                    : setError(getErrorMessage(e.response.data.message));
            }
        })();
    }, [city]);

    if (!state) {
        return <ErrorMessage errorMessage={error} />;
    }

    return <InformationOfCity state={state} />;
};
