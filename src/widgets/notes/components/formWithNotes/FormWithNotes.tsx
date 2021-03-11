import React from 'react';
import {PropsType} from './typings';
import {NotesType} from '../../typings';
import style from '../../Notes.module.css';
import {NotesForm} from '../notesForm/NotesForm';
import {NotesItem} from '../notesItem/NotesItem';

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
    const filteredNotesByCountry = notes
        .filter((notes: NotesType) => notes.country === country);

    if (filteredNotesByCountry.length === 0) {

        return (
            <div className={style.wrapper}>
                <div className={style.container}>
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
                        changeVisibilityForm={changeVisibilityForm}
                    />
                </div>
            </div>
        )
    }

    return (
        <div className={style.wrapper}>
            <div className={style.container}>
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
                    changeVisibilityForm={changeVisibilityForm}
                />
                <NotesItem
                    city={city}
                    removeNote={removeNote}
                    filteredNotesByCountry={filteredNotesByCountry}
                />
            </div>
        </div>
    );
};
