import React from 'react';
import {PropsType} from './typings';
import {Button} from '../button/Button';
import style from '../../Notes.module.css';
import {NotesForm} from '../notesForm/NotesForm';
import {NotesForCity} from '../notesForCity/NotesForCity';

export const FormWithNotes: React.FC<PropsType> = ({
    city,
    notes,
    title,
    country,
    addNotes,
    showForm,
    cityTitle,
    removeNote,
    description,
    changeInputValue,
    changeTxtAreaValue,
    changeVisibilityForm,
    changeInputCityValue,
}) => {

    return (
        <div className={style.wrapper}>
            <div className={style.container}>
                <Button
                    changeVisibilityForm={changeVisibilityForm}
                />
                <NotesForm
                    city={city}
                    title={title}
                    addNotes={addNotes}
                    showForm={showForm}
                    cityTitle={cityTitle}
                    description={description}
                    changeInputValue={changeInputValue}
                    changeTxtAreaValue={changeTxtAreaValue}
                    changeInputCityValue={changeInputCityValue}
                />
                <NotesForCity
                    city={city}
                    notes={notes}
                    country={country}
                    removeNote={removeNote}
                />
            </div>
        </div>
    );
};
