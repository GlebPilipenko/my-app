import React from 'react';
import {PropsType} from './typings';
import {NotesType} from '../../typings';
import notesStyle from '../../Notes.module.css';
import {NotesForm} from '../notesForm/NotesForm';
import {NotesItem} from '../notesItem/NotesItem';
import {AccordionItem} from './accordionItem/AccordionItem';

export const AccordionWithNotes: React.FC<PropsType> = ({
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
    const findedCity: string[] = [];
    const filteredNotesByCountry = notes
        .filter((notes: NotesType) => notes.country === country);

    for (const note of filteredNotesByCountry) {
            if (!findedCity.includes(note.city as string)) {
                findedCity.push(note.city as string);
            }
    }

    const renderNotesAccordion = () => {

        return findedCity.map((findedCity: string, index: number) => {

            return (
                <AccordionItem
                    key={index}
                    city={city}
                    notes={notes}
                    country={country}
                    findedCity={findedCity}
                    removeNote={removeNote}
                />
            );
        });
    };

    if (findedCity.length > 0 && city && findedCity.includes(city)) {

        return (
            <div className={notesStyle.wrapper}>
                <div className={notesStyle.container}>
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
        )
    }

    return (
        <div className={notesStyle.wrapper}>
            <div className={notesStyle.container}>
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
                {renderNotesAccordion()}
            </div>
        </div>
    );
};
