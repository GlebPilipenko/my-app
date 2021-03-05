import React, {ChangeEvent, useCallback, useEffect, useState} from 'react';
import {NotesForCity} from './components/notesForCity/NotesForCity';
import {NotesForm} from './components/notesForm/NotesForm';
import {Button} from './components/button/Button';
import {ErrorMessage} from '../../common/errorMessage/ErrorMessage';
import style from './Notes.module.css';
import {
    serviceLocalStorage,
    setDataToLocalStorage
} from '../../services/localStorage';
import {NotesWithoutCity} from './components/notesWithoutCity/NotesWithoutCity';
import {getParseLocalStorageData} from '../../services/localStorage';

type PropsType = {
    city?: string;
    country?: string;
};

export type NotesType = {
    city: string | undefined;
    title: string | undefined;
    country: string | undefined;
    description: string | undefined;
};

export const Notes: React.FC<PropsType> = ({
    city,
    country,
}) => {
    let [notes, setNotes] = useState<NotesType[]>([]);

    const [title, setTitle] = useState<string>('');
    const [cityTitle, setCityTitle] = useState<string>('');
    const [description, setDescription] = useState<string>('');

    const [showForm, setShowForm] = useState<boolean>(false);
    const [showInfo, setShowInfo] = useState<boolean>(false);

    const changeVisibilityForm = () => setShowForm(true);
    const changeVisibilityInfo = () => setShowInfo(!showInfo);

    const changeInputValue = useCallback((e: ChangeEvent<HTMLInputElement>) => {
        setTitle(e.currentTarget.value);
    }, []);
    const changeTxtAreaValue = useCallback((e: ChangeEvent<HTMLTextAreaElement>) => {
        setDescription(e.currentTarget.value);
    }, [setDescription]);
    const changeInputCityValue = useCallback((e: ChangeEvent<HTMLInputElement>) => {
        setCityTitle(e.currentTarget.value);
    }, [setCityTitle]);

    const addNotes = () => {
        const newNote = {title, description, country, city};
        const findedNotes = serviceLocalStorage(
            'widget.Notes', newNote, city, setNotes
        );

        setNotes([...findedNotes, newNote]);
        setDataToLocalStorage(
            'widget.Notes', JSON.stringify([...findedNotes, newNote])
        );
        setTitle('');
        setCityTitle('');
        setDescription('');
        setShowForm(false);
    };
    const removeNote = (title: string | undefined) => {
        const findedNotes = serviceLocalStorage('widget.Notes');
        const trimmedString = title?.slice(1).trim();
        const filteredNotes = findedNotes.filter((obj: NotesType) => {

            if (title?.includes('•')) {
                return obj.title !== trimmedString;
            }

        });
        setNotes(filteredNotes.filter((el: NotesType) => el.city === city));
        setDataToLocalStorage('widget.Notes', JSON.stringify(filteredNotes));
    };

    useEffect(() => {
        serviceLocalStorage('widget.Notes');
    }, []);

    notes = getParseLocalStorageData('widget.Notes', []);

    if (!city) {
        if (!notes.length) {

            return (
                <ErrorMessage
                    errorMessage={'Sorry, you have no notes for the city and' +
                    ' country...'} />
            );
        }

        return (
            <NotesWithoutCity
                notes={notes}
                country={country}
                showInfo={showInfo}
                removeNote={removeNote}
                changeVisibilityInfo={changeVisibilityInfo} />
        );
    }

    if (!city && !country) <ErrorMessage errorMessage={'Sorry, no notes...'} />;

    return (
        <div className={style.wrapper}>
            <div className={style.container}>
                <Button changeVisibilityForm={changeVisibilityForm} />
                <NotesForm title={title} city={city}
                           addNotes={addNotes}
                           showForm={showForm}
                           cityTitle={cityTitle}
                           description={description}
                           changeInputValue={changeInputValue}
                           changeTxtAreaValue={changeTxtAreaValue}
                           changeInputCityValue={changeInputCityValue} />
                <NotesForCity notes={notes} city={city}
                              country={country}
                              showInfo={showInfo}
                              removeNote={removeNote}
                              changeVisibilityInfo={changeVisibilityInfo} />
            </div>
        </div>
    );
};


// if (!city && country) {
//     const lsObject = getParseLocalStorageData('widget.Notes', []);
//
//     notes = lsObject;
//
//     return (
//         <div className={style.wrapper}>
//             <div className={style.container}>
//                 <NotesForCity notes={notes} city={city}
//                               showInfo={showInfo}
//                               country={country}
//                               removeNote={removeNote}
//                               changeVisibilityInfo={changeVisibilityInfo} />
//             </div>
//         </div>
//     );
// }


// const getLocalStorageArray = useCallback(
//     (widgetName = 'widget.Notes', newTask?: NotesType,
//      city?: string | undefined, setNotes?: Function
//     ) => {
//
//         return serviceLocalStorage(widgetName);
// }, []);


// <div className={style.place__container}>
//     <p className={style.country}>
//         {notes.length ? country : ''}
//     </p>
//     <p className={style.city}
//        onClick={changeVisibilityInfo}>
//         {notes.length ? city : ''}
//     </p>
// </div>