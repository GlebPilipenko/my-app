import React from 'react';
import {NotesType} from '../../Notes';
import style from './NotesForCity.module.css';
import {NotesWithoutCity} from '../notesWithoutCity/NotesWithoutCity';

type PropsType = {
    city: string | undefined;
    country: string | undefined;
    notes: NotesType[];
    showInfo: boolean;
    removeNote: (title: string | undefined) => void;
    changeVisibilityInfo: () => void;
};

type TasksType = {
    title: string | undefined;
    description: string | undefined;
    city: string | undefined;
    country: string | undefined;
};

export const NotesForCity: React.FC<PropsType> = ({
city,
country,
notes,
showInfo,
removeNote,
changeVisibilityInfo
}) => {

    if (!city) {
        return <NotesWithoutCity notes={notes} country={country}
                                 showInfo={showInfo} removeNote={removeNote}
                                 changeVisibilityInfo={changeVisibilityInfo} />;
    }

    return (
        <>
            {notes.map((obj: TasksType, index) => {
                const title = `• ${obj.title}`;
                const description = `${obj.description}`;

                return (
                    <>
                        {!showInfo &&
                        <div className={style.info__container} key={index}>
                            <p className={style.title}>
                                {title}
                            </p>
                            <div className={style.description__container}>
                                <p className={style.description}>
                                    {description}
                                </p>
                                <button className={style.remove__btn}
                                        onClick={() => removeNote(title)}>
                                    Delete
                                </button>
                            </div>
                        </div>}
                    </>
                );
            })}
        </>
    );
};
