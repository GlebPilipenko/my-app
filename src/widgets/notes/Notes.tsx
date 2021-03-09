import React, {ChangeEvent, useCallback, useEffect, useState} from 'react';
import {ErrorMessage} from '../../common/errorMessage/ErrorMessage';
import {
    getParseLocalStorageData,
    setDataToLocalStorage
} from '../../services/localStorage';
import {FormWithNotes} from './components/formWithNotes/FormWithNotes';
import {
    AccordionWithButtonForm
} from './components/accordionWithButtonForm/AccordionCityWithButtonForm';
import { getNotes } from './service/getNotes';
import { LocalStorageTitles } from './enums/Enums'
import { NotesComponentsType, NotesType } from './typings/';

export const Notes: React.FC<NotesComponentsType> = ({city, country}) => {
    const notesWidget = LocalStorageTitles.NotesWidget

    const findedCity: any[] = [];
    const findedCountry: any[] = [];

    const [notes, setNotes] = useState<NotesType[]>(
        getParseLocalStorageData('widget.Notes'));
    const arrayCities = notes.map(({city}) => city);
    const arrayCountries = notes.map(({country}) => country);

    const [showForm, setShowForm] = useState<boolean>(false);
    const [title, setTitle] = useState<string>('');
    const [cityTitle, setCityTitle] = useState<string>('');
    const [description, setDescription] = useState<string>('');

    const addNotes = () => {
        city = !city ? cityTitle : city;
        const newNote = {title, description, country, city};
        const findedNotes = getNotes('widget.Notes', newNote, city, setNotes);

        setNotes([...findedNotes, newNote]);
        setDataToLocalStorage(
            notesWidget, JSON.stringify([...findedNotes, newNote])
        );

        setTitle('');
        setCityTitle('');
        setDescription('');
        setShowForm(false);
    };
    const changeVisibilityForm = () => setShowForm(true);
    const removeNote = (title: string | undefined) => {
        const trimmedString = title?.slice(1).trim();
        const filteredNotes = getNotes(notesWidget).filter((obj: NotesType) => {

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

        setDataToLocalStorage(notesWidget, JSON.stringify(filteredNotes));
    };

    const changeInputValue = useCallback((e: ChangeEvent<HTMLInputElement>) => {
        setTitle(e.currentTarget.value);
    }, []);
    const changeTxtAreaValue = useCallback((e: ChangeEvent<HTMLTextAreaElement>) => {
        setDescription(e.currentTarget.value);
    }, [setDescription]);
    const changeInputCityValue = useCallback((e: ChangeEvent<HTMLInputElement>) => {
        setCityTitle(e.currentTarget.value);
    }, [setCityTitle]);

    for (const el of arrayCities) {
        if (!findedCity.includes(el)) {
            findedCity.push(el);
        }
    }

    for (const el of arrayCountries) {
        if (!findedCountry.includes(el)) {
            findedCountry.push(el);
        }
    }

    useEffect(() => {
        getNotes(notesWidget, {} as NotesType, city);
    }, [city]);

    if (!notes.length) {
        return (
            <ErrorMessage
                errorMessage={'Sorry, you have no notes for the city...'}
            />
        );
    }

    if (city && !country) {
        return (
            <ErrorMessage
                errorMessage={'Sorry, no notes...'}
            />
        )
    }

    if (!city && !country) {
        return (
            <ErrorMessage
                errorMessage={'Sorry, no notes...'}
            />
        );
    }

    // if (city && (country && !findedCountry.includes(country))) {
    //     const filteredNotesByCountry = getNotes(notesWidget)
    //         .filter((obj: NotesType) => obj.country === country);
    //
    //         debugger
    //
    //     if (filteredNotesByCountry.length === 0) {
    //
    //         return (
    //             <FormWithNotes
    //                 city={city}
    //                 notes={notes}
    //                 title={title}
    //                 country={country}
    //                 showForm={showForm}
    //                 addNotes={addNotes}
    //                 cityTitle={cityTitle}
    //                 removeNote={removeNote}
    //                 description={description}
    //                 findedCountry={findedCountry}
    //                 changeInputValue={changeInputValue}
    //                 changeTxtAreaValue={changeTxtAreaValue}
    //                 changeInputCityValue={changeInputCityValue}
    //                 changeVisibilityForm={changeVisibilityForm}
    //             />
    //         )
    //     }
    // }

    if (!city || (!findedCity.includes(city) && findedCity.length)) {

        if (country && !findedCountry.includes(country)) {
            return (
                <FormWithNotes
                    city={city}
                    notes={notes}
                    title={title}
                    showForm={showForm}
                    addNotes={addNotes}
                    cityTitle={cityTitle}
                    removeNote={removeNote}
                    description={description}
                    changeInputValue={changeInputValue}
                    changeTxtAreaValue={changeTxtAreaValue}
                    changeInputCityValue={changeInputCityValue}
                    changeVisibilityForm={changeVisibilityForm}
                />
            )
        }

        return (
            <AccordionWithButtonForm
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
                changeVisibilityForm={changeVisibilityForm}
            />
        );
    }

    return (
        <FormWithNotes
            city={city}
            notes={notes}
            title={title}
            showForm={showForm}
            addNotes={addNotes}
            cityTitle={cityTitle}
            removeNote={removeNote}
            description={description}
            changeInputValue={changeInputValue}
            changeTxtAreaValue={changeTxtAreaValue}
            changeInputCityValue={changeInputCityValue}
            changeVisibilityForm={changeVisibilityForm}
        />
    );
};
