import React from 'react';
import {NotesType} from '../../Notes';
import style from '../notesForCity/NotesForCity.module.css';

type NotesWithoutCities = {
    notes: NotesType[];
    country: string | undefined;
    showInfo: boolean;
    removeNote: (title: string | undefined) => void;
    changeVisibilityInfo: () => void;
};

export const NotesWithoutCity: React.FC<NotesWithoutCities> = ({
   notes,
   country,
   showInfo,
   removeNote,
   changeVisibilityInfo,
}) => {
    const filteredCity: any[] = [];
    const copyNotes = notes.map(city => city.city);

    for (const el of copyNotes) {
        if (!filteredCity.includes(el)) {
            filteredCity.push(el);
        }
    }

    return (
        <>
            <p className={style.country}>{country}</p>
            {filteredCity.map((city: string, index: number) => {
                return <>
                    <p key={index} className={style.city}
                       onClick={changeVisibilityInfo}>{city}
                    </p>
                    {!showInfo ? null : notes
                        .map((obj: NotesType, index: number) => {
                            const title = `• ${obj.title}`;
                            const description = obj.description;

                            if (obj.city !== city) {
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
                                        <button
                                            className={style.remove__btn}
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