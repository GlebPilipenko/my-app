import React, {useEffect, useState} from 'react';
import {PropsType} from './typings/';
import {
    CovidAPIType,
    getInfoByCovid
} from './index';
import {Diagrams} from './components/holst/Holst';
import {ErrorMessage} from '../common/errorMessage/ErrorMessage';

export const ColumnarDiagram: React.FC<PropsType> = ({country}) => {
    const [state, setState] = useState<any | CovidAPIType>(null);
    const [error, setError] = useState<string>('');

    useEffect(() => {
        (async () => {
            try {
                const infoByCovid = await getInfoByCovid(country);
                setState(Object.entries(infoByCovid.data))
            } catch (e) {
                !e.response
                    ? setError('Your request is blocked')
                    : setError(e.response.data.message)
            }
        })();
    }, [country]);

    if (error.length) {
        return <ErrorMessage errorMessage={error} />
    }

    return (
        <Diagrams state={state}/>
    )
};