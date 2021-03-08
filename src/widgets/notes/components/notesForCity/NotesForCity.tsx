import React from 'react';
import {NotesType} from '../../Notes';
import style from './NotesForCity.module.css';

type PropsType = {
    notes: NotesType[];
    city: string | undefined;
    removeNote: (title: string | undefined) => void;
};

export const NotesForCity: React.FC<PropsType> = ({
    city,
    notes,
    removeNote,
}) => {

    return (
        <>
            {notes.map((obj: NotesType, index: number) => {
                const title = `• ${obj.title}`;
                const description = `${obj.description}`;

                if (obj.city !== city || !city) {

                    return null
                }

                return (
                    <div key={index}
                         className={style.info__container}>
                        <p className={style.title}>{title}</p>
                        <div className={style.description__container}>
                            <p className={style.description}>{description}</p>
                            <button className={style.remove__btn}
                                    onClick={() => removeNote(title)}>
                                Delete
                            </button>
                        </div>
                    </div>
                );
            })}
        </>
    );
};
