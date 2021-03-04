import React, {ChangeEvent, useCallback, useEffect, useState} from 'react';
import {NotesForCity} from './components/notesForCity/NotesForCity';
import {NotesForm} from './components/notesForm/NotesForm';
import {Button} from './components/button/Button';
import style from './Notes.module.css';
import {ErrorMessage} from '../../common/errorMessage/ErrorMessage';

type PropsType = {
    city?: string;
    country?: string;
};

export type NotesType = {
    title: string | undefined;
    description: string | undefined;
    city: string | undefined;
    country: string | undefined;
};

export const Notes: React.FC<PropsType> = ({
country,
city,
}) => {
    let [notes, setNotes] = useState<NotesType[] | any>([]);
    const [showForm, setShowForm] = useState<boolean>(false);
    const [showInfo, setShowInfo] = useState<any>(false);
    const [title, setTitle] = useState<string>('');
    const [cityTitle, setCityTitle] = useState<string>('');
    const [description, setDescription] = useState<string>('');
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
    const removeNote = (title: string | undefined) => {
        const trimmedString = title?.slice(1).trim();
        const filteredNotes = notes.filter((obj: NotesType) => {

            if (title?.includes('•')) {
                return obj.title !== trimmedString;
            } else {
                return obj.title !== trimmedString;
            }
        });

        localStorage.setItem('widget.Notes', JSON.stringify([...filteredNotes]));
        setNotes([...filteredNotes]);
    };
    const addNotes = () => {
        const newTask = {title, description, country, city};
        const lsObject = getLocalStorageObject(newTask);

        localStorage.setItem('widget.Notes', JSON.stringify(
            [...lsObject, newTask]));

        setTitle('');
        setCityTitle('');
        setDescription('');
        setShowForm(false);
    };
    const getLocalStorageObject = useCallback((newTask?: NotesType) => {
        const lsObject = JSON.parse(localStorage.getItem('widget.Notes') || '[]');
        const findCity = lsObject.filter((obj: NotesType) => obj.city === city);

        if (!newTask) {
            setNotes([...findCity]);
        } else {
            setNotes([...findCity, newTask]);
        }

        return lsObject;
    }, [city]);

    useEffect(() => {
        getLocalStorageObject();
    }, [getLocalStorageObject]);

    if (!city && !country) {
        return <ErrorMessage errorMessage={'Sorry, no notes...'} />;
    }

    if (!city && country) {
        const lsObject = JSON.parse(localStorage
            .getItem('widget.Notes') || '[]');

        notes = lsObject;

        return (
            <div className={style.wrapper}>
                <div className={style.container}>
                    <NotesForCity notes={notes} showInfo={showInfo} city={city}
                                  country={country} removeNote={removeNote}
                                  changeVisibilityInfo={changeVisibilityInfo} />
                </div>
            </div>
        );
    }

    return (
        <div className={style.wrapper}>
            <div className={style.container}>
                <Button changeVisibilityForm={changeVisibilityForm} />
                <NotesForm title={title} cityTitle={cityTitle} city={city}
                           description={description} showForm={showForm}
                           changeInputCityValue={changeInputCityValue}
                           changeTxtAreaValue={changeTxtAreaValue}
                           changeInputValue={changeInputValue}
                           addNotes={addNotes} />
                <div className={style.place__container}>
                    <p className={style.country}>
                        {notes.length ? country : ''}
                    </p>
                    <p className={style.city}
                       onClick={changeVisibilityInfo}>
                        {notes.length ? city : ''}
                    </p>
                </div>
                <NotesForCity notes={notes} showInfo={showInfo} city={city}
                              country={country} removeNote={removeNote}
                              changeVisibilityInfo={changeVisibilityInfo} />
            </div>
        </div>
    );
};
