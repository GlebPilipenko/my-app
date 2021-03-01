import React from 'react';
import style from './ErrorMessage.module.css';

type PropsType = {
    errorMessage: null | string;
};

export const ErrorMessage: React.FC<PropsType> = ({errorMessage}) => {
    return (
        <div className={style.error__container}>
            <div className={style.error__block}>
                {errorMessage}
            </div>
        </div>
    );
};
