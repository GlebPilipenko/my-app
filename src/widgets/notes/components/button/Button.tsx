import React from 'react';
import style from './Button.module.css';
import { PropsType } from './types/type';

export const Button: React.FC<PropsType> = ({changeVisibilityForm}) => (
    <div className={style.btn__container}>
        <button
            className={style.btn}
            onClick={changeVisibilityForm}>
            Create note
        </button>
    </div>
);
