import React from 'react';
import {PropsType} from './typings';
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
            {filteredNotesByCity.map(({title, description}, index: number) => {
                return (
                    <div
                        key={index}
                        className='modal-content'
                        style={{marginBottom: '10px'}}
                    >
                        <div className='modal-header'>
                            <h5 className='modal-title'>{title}</h5>
                            <span
                                aria-hidden='true'
                                style={{
                                    cursor: 'pointer'
                                }}
                                onClick={() => removeNote(title)}
                            >
                            ×
                            </span>
                        </div>
                        <div className='modal-body'>
                            <p>{description}</p>
                        </div>
                    </div>
                );
            })}
        </React.Fragment>
    );
};
