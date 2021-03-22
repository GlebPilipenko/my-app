import React from 'react';
import {PropsType} from './typings';
import '../accordionWithNotes/accordionItem';
import {NotesType} from 'src/widgets/notes/typings';

export const NotesItem: React.FC<PropsType> = ({
  city,
  removeNote,
  filteredNotesByCountry,
}) => {
  const filteredNotesByCity = filteredNotesByCountry
    .filter((note: NotesType) => note.city === city);

  return (
    <React.Fragment>
      {filteredNotesByCity
        .map(({noteID, title = '', description}, index: number) => {
        return (
          <div key={index} className={'info__container'}>
            <div className={'title__container'}>
              <p className={title}>• {title}</p>
              <span
                className={'deleteIcon'}
                onClick={() => removeNote(noteID)}
              >
                ✕
              </span>
            </div>
            <div className={'description__container'}>
              <p className={'description'}>{description}</p>
            </div>
          </div>
        );
      })}
    </React.Fragment>
  );
};
