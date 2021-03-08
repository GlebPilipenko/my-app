import React, {ChangeEvent, useCallback, useEffect, useState} from 'react';
import {ErrorMessage} from '../../common/errorMessage/ErrorMessage';
import {
    getParseLocalStorageData,
    serviceLocalStorage,
    setDataToLocalStorage
} from '../../services/localStorage';
import {FormWithNotes} from './components/formWithNotes/FormWithNotes';
import {
    AccordionWithButtonForm
} from './components/accordionWithButtonForm/AccordionCityWithButtonForm';

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
    let [notes, setNotes] = useState<NotesType[]>(
        getParseLocalStorageData('widget.Notes'));
    const copyNotes = notes.map(city => city.city);
    const findedCity: any[] = [];
    const [title, setTitle] = useState<string>('');
    const [cityTitle, setCityTitle] = useState<string>('');
    const [showForm, setShowForm] = useState<boolean>(false);
    const [description, setDescription] = useState<string>('');
    const addNotes = () => {
        city = !city ? cityTitle : city;
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
    const changeVisibilityForm = () => setShowForm(true);
    const removeNote = (title: string | undefined) => {
        const trimmedString = title?.slice(1).trim();
        const filteredNotes = serviceLocalStorage('widget.Notes')
            .filter((obj: NotesType) => {

                if (!title?.includes('•')) {
                    return null;
                }

                return obj.title !== trimmedString;

            });

        if (!city || city !== filteredNotes[0]?.city) {
            setNotes(filteredNotes);
        } else {
            setNotes(filteredNotes.filter((el: NotesType) => el.city === city));
        }

        setDataToLocalStorage('widget.Notes', JSON.stringify(filteredNotes));
    };
    const changeInputValue = useCallback((e: ChangeEvent<HTMLInputElement>) => {
        setTitle(e.currentTarget.value);
    }, [title]);
    const changeTxtAreaValue = useCallback((e: ChangeEvent<HTMLTextAreaElement>) => {
        setDescription(e.currentTarget.value);
    }, [setDescription]);
    const changeInputCityValue = useCallback((e: ChangeEvent<HTMLInputElement>) => {
        setCityTitle(e.currentTarget.value);
    }, [setCityTitle]);

    for (const el of copyNotes) {
        if (!findedCity.includes(el)) {
            findedCity.push(el);
        }
    }

    useEffect(() => {
        serviceLocalStorage('widget.Notes', {} as NotesType, city);
    }, [city]);

    if (!city || (!findedCity.includes(city) && findedCity.length)) {

        if (!city && !country) {
            return <ErrorMessage errorMessage={'Sorry, no notes...'} />;
        }

        if (!notes.length) {
            return (
                <ErrorMessage
                    errorMessage={'Sorry, you have no notes for the city...'} />
            );
        }

        return <AccordionWithButtonForm
            city={city}
            notes={notes}
            title={title}
            showForm={showForm}
            addNotes={addNotes}
            cityTitle={cityTitle}
            removeNote={removeNote}
            findedCity={findedCity}
            description={description}
            changeInputValue={changeInputValue}
            changeTxtAreaValue={changeTxtAreaValue}
            changeInputCityValue={changeInputCityValue}
            changeVisibilityForm={changeVisibilityForm} />;
    }

    return <FormWithNotes city={city} notes={notes}
                          title={title}
                          showForm={showForm}
                          addNotes={addNotes}
                          cityTitle={cityTitle}
                          removeNote={removeNote}
                          description={description}
                          changeInputValue={changeInputValue}
                          changeTxtAreaValue={changeTxtAreaValue}
                          changeInputCityValue={changeInputCityValue}
                          changeVisibilityForm={changeVisibilityForm} />;
};
