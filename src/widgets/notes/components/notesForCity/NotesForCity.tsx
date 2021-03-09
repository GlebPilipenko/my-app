import React from 'react';
import { NotesType } from '../../types';
import { PropsType } from './types/type'
import style from './NotesForCity.module.css';

export const NotesForCity: React.FC<PropsType> = ({
    city,
    notes,
    country,
    removeNote,
}) => (
    <React.Fragment>
        {notes.map((obj: NotesType, index: number) => {
            const title = `• ${obj.title}`;
            const description = `${obj.description}`;

            if (obj.city !== city || !city) {

                return null;
            }

            return (
                <div key={index}
                     className={style.info__container}>
                    <p className={style.title}>{title}</p>
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
