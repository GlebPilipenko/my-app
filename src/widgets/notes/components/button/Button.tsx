import React from 'react';
import {PropsType} from './typings';
import style from './Button.module.css';

export const Button: React.FC<PropsType> = ({changeVisibilityForm}) => (
    <div className={style.btn__container}>
        <button
            className={style.btn}
            onClick={changeVisibilityForm}>
            Create note
        </button>
    </div>
);
