import React, {useState} from 'react';
import {PropsType} from './typings';
import style from './AccordionItem.module.css';
import {NotesType} from 'src/widgets/notes/typings';

export const AccordionItem: React.FC<PropsType> = ({
    key,
    city,
    notes,
    country,
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

    const filteredNotesByCountry = notes
        .filter((notes: NotesType) => notes.country === country);

    const renderNoteItem = () => {
        return (
            <div>
                {(!city || !findedCity.includes(city)) && (
                    filteredNotesByCountry
                        .filter((note: NotesType) => note.city === findedCity)
                        .map(({title, description}) => {

                            return (
                                cityForNotes.includes(findedCity) && (
                                    <div key={title}
                                         className={style.info__container}>
                                        <p className={style.title}>• {title}</p>
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
                                )
                            );
                        })
                )}
            </div>
        )
    }

    if (city) {
        if (!findedCity.includes(city)) {
            return null;
        }
    }

    return (
        <React.Fragment key={key}>
            <div onClick={() => showFilteredNotes(findedCity)}>
                {findedCity}
            </div>
            {renderNoteItem()}
        </React.Fragment>
    );
};
