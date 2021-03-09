import React, {ChangeEvent} from 'react';
import style from './NotesForm.module.css';
import { PropsType } from './type/types';

export const NotesForm: React.FC<PropsType> = ({
    city,
    title,
    addNotes,
    showForm,
    cityTitle,
    description,
    changeInputValue,
    changeTxtAreaValue,
    changeInputCityValue,
}) => {

    if (!showForm) {
        return null;
    }

    return (
        <div className={style.form__container}>
            <div className={style.input__container}>
                <h4>Add your title</h4>
                <input
                    type="text"
                    value={title}
                    className={style.input}
                    onChange={changeInputValue}
                />
            </div>
            {!city && (
                <div className={style.input__container}>
                    <h4>Add your city</h4>
                    <input
                        type="text"
                        value={cityTitle}
                        className={style.input}
                        onChange={changeInputCityValue}
                    />
                </div>
            )}
            <div className={style.textarea__container}>
                <h4>Add your description</h4>
                <textarea
                    value={description}
                    onChange={changeTxtAreaValue}
                    className={style.textarea}
                ></textarea>
            </div>
            <button
                className={`${style.btn} ${style.btn__save}`}
                onClick={addNotes}>
                Save
            </button>
        </div>
    );
};
