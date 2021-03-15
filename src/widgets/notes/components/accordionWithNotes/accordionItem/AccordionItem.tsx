import React, {useState} from 'react';
import './animationStyle.css'
import {PropsType} from './typings';
import style from './AccordionItem.module.css';
import {getCapitalizedString} from 'src/utils';
import {NotesType} from 'src/widgets/notes/typings';
import {CSSTransition} from 'react-transition-group';

export const AccordionItem: React.FC<PropsType> = ({
    city,
    notes,
    country,
    findedCity,
    removeNote,
}) => {
    const [cityForNotes, setCityForNotes] = useState<string[]>([]);
    const [isOpenAccordion, setIsOpenAccordion] = useState<boolean>(false);

    const showFilteredNotes = (city: string) => {
        setCityForNotes((prev: string[]) => {
            if (prev.includes(city)) {
                return prev.filter(el => el !== city);
            } else {
                return [...prev, city];
            }
        });

        setIsOpenAccordion(!isOpenAccordion);
    };


    const filteredNotesByCountry = notes
        .filter((notes: NotesType) => notes.country === country);

    const renderNoteItem = () => {
        return (
            <div>
                {
                    (!city || !findedCity.includes(city)) && (
                    filteredNotesByCountry
                        .filter((note: NotesType) => note.city === findedCity)
                        .map(({title, description}, index: number) => {

                            return (
                                cityForNotes.includes(findedCity) && (
                                    <div
                                        key={index}
                                        className={style.info__container}
                                    >
                                        <div
                                            className={style.title__container}>
                                            <p className={style.title}>
                                                • {title}
                                            </p>
                                            <span
                                                onClick={() => removeNote(title)}>
                                                ✕
                                            </span>
                                        </div>
                                        <div className={style.description__container}>
                                            <p className={style.description}>
                                                {description}
                                            </p>
                                        </div>
                                    </div>
                                )
                            );
                        })
                    )
                }
            </div>
        );
    };

    if (city) {
        if (!findedCity.includes(city)) {
            return null;
        }
    }

    return (
        <React.Fragment>
            <div className={style.city__container}>
                {getCapitalizedString(findedCity)}
                <span onClick={() => showFilteredNotes(findedCity)}>
                    {!isOpenAccordion ? '▼' : '▲'}
                </span>
            </div>
            <CSSTransition
            in={isOpenAccordion}
            timeout={1000}
            classNames='accordion__item'
            >
                {renderNoteItem()}
           </CSSTransition>
        </React.Fragment>
    );
};
