import React from 'react';
import style from './Button.module.css';

type PropsType = {
    changeVisibilityForm: () => void;
};

export const Button: React.FC<PropsType> = ({changeVisibilityForm}) => {

    return (
        <div className={style.btn__container}>
            <button className={style.btn}
                    onClick={changeVisibilityForm}>
                Create note
            </button>
        </div>
    );
};
