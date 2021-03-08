import React, {ChangeEvent, useState} from 'react';
import {Button} from '../button/Button';
import {NotesForm} from '../notesForm/NotesForm';
import {NotesType} from '../../Notes';
import notesStyle from '../../Notes.module.css';
import style from './AccordionCityWithButtonForm.module.css';

type PropsType = {
    title: string;
    findedCity: any[];
    showForm: boolean;
    cityTitle: string;
    notes: NotesType[];
    description: string;
    addNotes: () => void;
    city: string | undefined;
    changeVisibilityForm: () => void;
    removeNote: (title: string | undefined) => void;
    changeInputValue: (e: ChangeEvent<HTMLInputElement>) => void;
    changeInputCityValue: (e: ChangeEvent<HTMLInputElement>) => void;
    changeTxtAreaValue: (e: ChangeEvent<HTMLTextAreaElement>) => void;
};

export const AccordionWithButtonForm: React.FC<PropsType> = ({
    city,
    notes,
    title,
    addNotes,
    showForm,
    cityTitle,
    removeNote,
    findedCity,
    description,
    changeInputValue,
    changeTxtAreaValue,
    changeVisibilityForm,
    changeInputCityValue,
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
    const getCityWithInformationAccordion = () => {
        return findedCity.map((findedCity: string, index) => {
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
        })
    }

    return (
        <div className={notesStyle.wrapper}>
            <div className={notesStyle.container}>
                <Button changeVisibilityForm={changeVisibilityForm} />
                <NotesForm title={title} city={city}
                           addNotes={addNotes}
                           showForm={showForm}
                           cityTitle={cityTitle}
                           description={description}
                           changeInputValue={changeInputValue}
                           changeTxtAreaValue={changeTxtAreaValue}
                           changeInputCityValue={changeInputCityValue} />
                {getCityWithInformationAccordion()}
            </div>
        </div>
    );
};
