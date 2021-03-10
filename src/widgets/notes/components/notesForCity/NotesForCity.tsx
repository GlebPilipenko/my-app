import React from 'react';
import {NotesType} from '../../typings';
import {PropsType} from './typings'
import style from './NotesForCity.module.css';

export const NotesForCity: React.FC<PropsType> = ({
    city,
    country,
    removeNote,
    filteredNotesByCountry,
}) => {
    const filteredNotesByCity = filteredNotesByCountry
        .filter((note: NotesType) => note.city === city);

    return (
        <React.Fragment>
            {filteredNotesByCity.map(({title, description}, index: number) => {

                return (
                    <div key={index}
                         className={style.info__container}>
                        <p className={style.title}>• {title}</p>
                        <div className={style.description__container}>
                            <p className={style.description}>{description}</p>
                            <button
                                className={style.remove__btn}
                                onClick={() => removeNote(title)}>
                                Delete
                            </button>
                        </div>
                    </div>
                );
            })}
        </React.Fragment>
    );
};
