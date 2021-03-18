import React, {useEffect, useState} from 'react';
import {PropsType} from './typings/';
import {CovidAPIType, getInfoByCovid} from './index';
import {Diagrams} from './components/svgDiagrams/SVGDiagrams';
import {ErrorMessage} from 'src/components/common/errorMessage';

export const CovidDiagram: React.FC<PropsType> = ({country}) => {
    const [error, setError] = useState<string>('');
    const [state, setState] = useState<any | CovidAPIType>(null);

    useEffect(() => {
        (async () => {
            try {
                const infoByCovid = await getInfoByCovid(country);
                setState(Object.entries(infoByCovid.data));
            } catch (e) {
                !e.response
                    ? setError('Your request is blocked')
                    : setError(e.response.data.message);
            }
        })();
    }, [country]);

    if (error.length) {
        return <ErrorMessage errorMessage={error} />
    }

    return (
        <Diagrams
          state={state}
          error={error}
        />
    )
};