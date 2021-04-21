import React, {FC} from 'react';
import {PropsType} from './typings';
import {NotesForm} from '../notesForm';
import {NotesItem} from '../notesItem';
import {AccordionItem} from './accordionItem';
import {NotesType} from 'src/widgets/notes/typings';
import style from './AccordionWithNotes.module.css';

export const AccordionWithNotes: FC<PropsType> = ({
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
  changeInputCityValue,
  changeVisibilityForm,
}) => {

  const foundNotes: string[] = [];
  const filteredNotesByCountry = notes
    .filter((notes: NotesType) => notes.country === country);

  const renderNotesAccordion = () => foundNotes
    .map((foundCity: string, index: number) => {
        return (
          <React.Fragment key={index}>
            <AccordionItem
              city={city}
              foundCity={foundCity}
              removeNote={removeNote}
              filteredNotesByCountry={filteredNotesByCountry}
            />
          </React.Fragment>
        );
      }
    );

  for (const note of filteredNotesByCountry) {
    if (!foundNotes.includes(note.city as string)) {
      foundNotes.push(note.city as string);
    }
  }

  const hasCity = city && foundNotes.length > 0 && foundNotes.includes(city);

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
          changeVisibilityForm={changeVisibilityForm}
          changeInputCityValue={changeInputCityValue}
        />
        {
          hasCity
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
