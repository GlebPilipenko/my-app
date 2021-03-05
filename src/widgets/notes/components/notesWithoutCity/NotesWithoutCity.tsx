import React from 'react';
import {NotesType} from '../../Notes';
import style from '../notesForCity/NotesForCity.module.css';

type NotesWithoutCities = {
    showInfo: boolean;
    notes: NotesType[];
    country: string | undefined;
    changeVisibilityInfo: () => void;
    removeNote: (title: string | undefined) => void;
};

export const NotesWithoutCity: React.FC<NotesWithoutCities> = ({
    notes,
    country,
    showInfo,
    removeNote,
    changeVisibilityInfo,
}) => {
    const findNotesForCountry: any[] = [];
    const copyNotes = notes.map(country => country.country);

    for (const el of copyNotes) {
        if (!findNotesForCountry.includes(el)) {
            findNotesForCountry.push(el);
        }
    }

    return (
        <>
            {findNotesForCountry.map((country: string, index: number) => {
                return <>
                    <p key={index}
                       className={style.city}
                       onClick={changeVisibilityInfo}>
                        {country}
                    </p>
                    {!showInfo ? null : notes
                        .map((obj: NotesType, index: number) => {
                            const title = `• ${obj.title}`;
                            const description = obj.description;

                            if (obj.country !== country) {
                                return null;
                            }

                            return (
                                <div className={style.info__container}
                                     key={index}>
                                    <p className={style.title}>{title}</p>
                                    <div
                                        className={style.description__container}>
                                        <p className={style.description}>
                                            {description}
                                        </p>
                                        <button className={style.remove__btn}
                                                onClick={() => removeNote(title)}>
                                            Delete
                                        </button>
                                    </div>
                                </div>
                            );
                        })}
                </>;
            })}
        </>
    );
};
