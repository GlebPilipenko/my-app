import React, {useState} from 'react';
import {PropsType} from './typings';
import style from './AccordionItem.module.css';
import {NotesType} from 'src/widgets/notes/typings';
import {TransitionGroup, CSSTransition, Transition} from 'react-transition-group';
import { getCapitalizedString } from 'src/utils';

export const AccordionItem: React.FC<PropsType> = ({
    key,
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
            <React.Fragment>
                <TransitionGroup
                    in={isOpenAccordion}
                    timeout={1}
                >
                {(!city || !findedCity.includes(city)) && (
                    filteredNotesByCountry
                        .filter((note: NotesType) => note.city === findedCity)
                        .map(({title, description}) => {

                            return (
                                cityForNotes.includes(findedCity) && (
                                    <Transition
                                        timeout={1000}
                                        classNames="item"
                                    >
                                        <div
                                            className={style.info__container}>
                                            <div
                                                className={style.title__container}>
                                                <p className={style.title}>
                                                    • {title}
                                                </p>
                                                <a href="#"
                                                   onClick={() => removeNote(title)}>
                                                    ✕
                                                </a>
                                            </div>
                                            <div
                                                className={style.description__container}>
                                                <p className={style.description}>
                                                    {description}
                                                </p>
                                            </div>
                                        </div>
                                    </Transition>
                                )
                            );
                        })
                )}
                </TransitionGroup>
            </React.Fragment>
        );
    };

    if (city) {
        if (!findedCity.includes(city)) {
            return null;
        }
    }

    return (
        <React.Fragment key={key}>
            <div className={style.city__container}>
                {getCapitalizedString(findedCity)}
                <a href="#"
                   onClick={() => showFilteredNotes(findedCity)}>
                    {!isOpenAccordion ? '▼' : '▲'}
                </a>
            </div>
            {renderNoteItem()}
        </React.Fragment>
    );
};
