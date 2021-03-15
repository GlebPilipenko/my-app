import React from 'react';
import {PropsType} from './typings';
import style from './NotesItem.module.css';
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
                    <div key={index} className={style.info__container}>
                        <div className={style.title__container}>
                            <p className={style.title}>
                                • {title}
                            </p>
                            <span onClick={() => removeNote(title)}>
                                ✕
                            </span>
                        </div>
                        <div className={style.description__container}>
                            <p className={style.description}>
                                {description}
                            </p>
                        </div>
                    </div>
                );
            })}
        </React.Fragment>
    );
};
