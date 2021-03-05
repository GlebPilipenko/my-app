import React from 'react';
import {NotesType} from '../../Notes';
import style from './NotesForCity.module.css';

type PropsType = {
    showInfo: boolean;
    notes: NotesType[];
    city: string | undefined;
    country: string | undefined;
    changeVisibilityInfo: () => void;
    removeNote: (title: string | undefined) => void;
};

type TasksType = {
    city: string | undefined;
    title: string | undefined;
    country: string | undefined;
    description: string | undefined;
};

export const NotesForCity: React.FC<PropsType> = ({
    city,
    country,
    notes,
    showInfo,
    removeNote,
    changeVisibilityInfo,
}) => {

    return (
        <>
            {notes.map((obj: TasksType, index: number) => {
                const title = `• ${obj.title}`;
                const description = `${obj.description}`;

                return (
                    <div key={index}
                         className={style.info__container}>
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
                    </div>
                );
            })}
        </>
    );
};
