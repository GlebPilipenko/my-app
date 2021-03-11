import React, { useEffect, useState } from 'react';
import {PropsType} from './typings/index';
import style from './ColumnarDiagram.module.css';
import {
    CovidAPIType,
    getInfoByCovid
} from './index';

export const ColumnarDiagram: React.FC<PropsType> = ({country}) => {
    const [state, setState] = useState<any>({});
    const {
        cases,
        tests,
        recovered,
        deaths,
        casesPerOneMillion,
        deathsPerOneMillion,
    } = state;
    // const arrayValueForDiagrams: any[] = [];
    //
    // for (const key in state) {
    //     console.log(state[key]);
    // }
    //
    // console.log(state);
    // console.log(arrayValueForDiagrams);

    useEffect(() => {
        (async () => {
            try {
                const infoByCovid = await getInfoByCovid(country);
                setState(infoByCovid.data);
            } catch (e) {

            }
        })()
    }, []);

    return (
        <div className={style.wrapper}>
            <div className={style.item}>
                {`Cases: ${cases}`}
            </div>
            <div className={style.item}>
                {`Tests: ${tests}`}
            </div>
            <div className={style.item}>
                {`Recovered: ${recovered}`}
            </div>
            <div className={style.item}>
                {`Deaths: ${deaths}`}
            </div>
            <div className={style.item}>
                {`Cases Per One Million: ${casesPerOneMillion}`}
            </div>
            <div className={style.item}>
                {`Deaths Per One Million: ${deathsPerOneMillion}`}
            </div>
        </div>
    );
}