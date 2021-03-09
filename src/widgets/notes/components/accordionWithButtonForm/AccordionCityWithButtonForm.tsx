import React from 'react';
import {PropsType} from './typings';
import {Button} from '../button/Button';
import notesStyle from '../../Notes.module.css';
import {NotesForm} from '../notesForm/NotesForm';
import {AccordionItem} from '../accordionItem/AccordionItem';

export const AccordionWithButtonForm: React.FC<PropsType> = ({
    city,
    notes,
    title,
    addNotes,
    showForm,
    cityTitle,
    removeNote,
    findedCity,
    description,
    changeInputValue,
    changeTxtAreaValue,
    changeVisibilityForm,
    changeInputCityValue,
}) => {

    const renderNotesAccordion = () => {
        return findedCity.map((findedCity: string, index: number) => {
            return (
                <AccordionItem
                    city={city}
                    notes={notes}
                    index={index}
                    findedCity={findedCity}
                    removeNote={removeNote}
                />
            );
        })
    }

    return (
        <div className={notesStyle.wrapper}>
            <div className={notesStyle.container}>
                <Button changeVisibilityForm={changeVisibilityForm} />
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
                {renderNotesAccordion()}
            </div>
        </div>
    );
};
