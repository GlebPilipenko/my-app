import React, {ChangeEvent} from 'react';
import style from '../../Notes.module.css';
import {Button} from '../button/Button';
import {NotesForm} from '../notesForm/NotesForm';
import {NotesForCity} from '../notesForCity/NotesForCity';
import {NotesType} from '../../Notes';

type PropsType = {
    title: string;
    notes: NotesType[];
    showForm: boolean;
    cityTitle: string;
    description: string;
    addNotes: () => void;
    city: string | undefined;
    changeVisibilityForm: () => void;
    removeNote: (title: string | undefined) => void;
    changeInputValue: (e: ChangeEvent<HTMLInputElement>) => void;
    changeInputCityValue: (e: ChangeEvent<HTMLInputElement>) => void;
    changeTxtAreaValue: (e: ChangeEvent<HTMLTextAreaElement>) => void;
};

export const FormWithNotes: React.FC<PropsType> = ({
    city,
    notes,
    title,
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
                <Button changeVisibilityForm={changeVisibilityForm} />
                <NotesForm title={title} city={city}
                           addNotes={addNotes}
                           showForm={showForm}
                           cityTitle={cityTitle}
                           description={description}
                           changeInputValue={changeInputValue}
                           changeTxtAreaValue={changeTxtAreaValue}
                           changeInputCityValue={changeInputCityValue} />
                <NotesForCity notes={notes} city={city}
                              removeNote={removeNote} />
            </div>
        </div>
    );
};
