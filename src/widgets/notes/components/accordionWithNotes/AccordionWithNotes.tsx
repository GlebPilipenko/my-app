import React from 'react';
import {PropsType} from './typings';
import {NotesForm} from '../notesForm';
import {NotesItem} from '../notesItem';
import {AccordionItem} from './accordionItem';
import {NotesType} from 'src/widgets/notes/typings';
import style from './AccordionWithNotes.module.css';

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
                <React.Fragment key={index}>
                    <AccordionItem
                        city={city}
                        notes={notes}
                        country={country}
                        findedCity={findedCity}
                        removeNote={removeNote}
                    />
                </React.Fragment>
            );
        });
    };

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
                {
                    city && findedCity.length > 0 && findedCity.includes(city)
                    ? <NotesItem
                            city={city}
                            removeNote={removeNote}
                            filteredNotesByCountry={filteredNotesByCountry}
                    />
                    : renderNotesAccordion()
                }
            </div>
        </div>
    );
};
