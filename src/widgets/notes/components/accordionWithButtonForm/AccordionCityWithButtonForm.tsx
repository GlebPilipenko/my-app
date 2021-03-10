import React from 'react';
import {PropsType} from './typings';
import {Button} from '../button/Button';
import notesStyle from '../../Notes.module.css';
import {NotesForm} from '../notesForm/NotesForm';
import {AccordionItem} from '../accordionItem/AccordionItem';
import {NotesType} from '../../typings';
import {NotesForCity} from '../notesForCity/NotesForCity';

export const AccordionWithButtonForm: React.FC<PropsType> = ({
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
    const findedCity: string[] = []
    const filteredNotesByCountry = notes.filter((notes: NotesType) => {
        return notes.country === country;
    });

    for (const note of filteredNotesByCountry) {
        if (!findedCity.includes(note.city)) {
            findedCity.push(note.city);
        }
    }

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

    if (findedCity.length > 0 && city && findedCity.includes(city)) {

        return (
            <div className={notesStyle.wrapper}>
                <div className={notesStyle.container}>
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
                        country={country}
                        removeNote={removeNote}
                        filteredNotesByCountry={filteredNotesByCountry}
                    />
                </div>
            </div>
        )
    }

    return (
        <div className={notesStyle.wrapper}>
            <div className={notesStyle.container}>
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
                {renderNotesAccordion()}
            </div>
        </div>
    );
};
