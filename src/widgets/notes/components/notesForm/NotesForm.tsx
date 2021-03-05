import React, {ChangeEvent} from 'react';
import style from './NotesForm.module.css';

type PropsType = {
    title: string;
    showForm: boolean;
    cityTitle: string;
    description: string;
    addNotes: () => void;
    city: string | undefined;
    changeInputValue: (e: ChangeEvent<HTMLInputElement>) => void;
    changeInputCityValue: (e: ChangeEvent<HTMLInputElement>) => void;
    changeTxtAreaValue: (e: ChangeEvent<HTMLTextAreaElement>) => void;
};

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

    return (
        <>
            {!showForm ? null :
                <div className={style.form__container}>
                    <div className={style.input__container}>
                        <h4>Add your title</h4>
                        <input type="text" value={title}
                               className={style.input}
                               onChange={changeInputValue} />
                    </div>
                    {!city && <div className={style.input__container}>
                        <h4>Add your city</h4>
                        <input type="text" value={cityTitle}
                               className={style.input}
                               onChange={changeInputCityValue} />
                    </div>}
                    <div className={style.textarea__container}>
                        <h4>Add your description</h4>
                        <textarea value={description}
                                  onChange={changeTxtAreaValue}
                                  className={style.textarea}>
                        </textarea>
                    </div>
                    <button
                        className={`${style.btn} ${style.btn__save}`}
                        onClick={addNotes}>
                        Save
                    </button>
                </div>}
        </>
    );
};
