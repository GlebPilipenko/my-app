import React, {useEffect, useState} from 'react';
import {PropsType} from './typings/';
import {
    CovidAPIType,
    getInfoByCovid
} from './index';
import {Diagrams} from './components/holst/Holst';

export const ColumnarDiagram: React.FC<PropsType> = ({country}) => {
    const [state, setState] = useState<any | CovidAPIType>(null);

    useEffect(() => {
        (async () => {
            try {
                const infoByCovid = await getInfoByCovid(country);
                setState(Object.entries(infoByCovid.data))
            } catch (e) {
                console.log(e);
            }
        })();
    }, [country]);

    return (
        <Diagrams state={state}/>
    )
};