import React, {useState} from 'react';
import {PropsType} from './typings';
import {NotesType} from '../../typings';
import style from './AccordionItem.module.css';

export const AccordionItem: React.FC<PropsType> = ({
    city,
    index,
    notes,
    findedCity,
    removeNote,
}) => {
    const [cityForNotes, setCityForNotes] = useState<string[]>([]);
    const showFilteredNotes = (city: string) => {
        setCityForNotes((prev: string[]) => {
            if (prev.includes(city)) {
                return prev.filter(el => el !== city);
            } else {
                return [...prev, city];
            }
        });
    };

    if (city) {
        if (!findedCity.includes(city)) {
            return null;
        }
    }

    return (
        <React.Fragment key={index}>
            <div onClick={() => showFilteredNotes(findedCity)}>
                {findedCity}
            </div>
            <div>
                {(!city || !findedCity.includes(city)) && notes
                    .filter((el: NotesType) => el.city === findedCity)
                    .map((obj: NotesType) => {
                        const title = `• ${obj.title}`;
                        const description = obj.description;

                        return (
                            cityForNotes.includes(findedCity) &&
                            <div key={obj.title}
                                 className={style.info__container}>
                                <p className={style.title}>{title}</p>
                                <div className={style.description__container}>
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
            </div>
        </React.Fragment>
    );
};
