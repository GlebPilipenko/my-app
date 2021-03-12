import React, {useEffect, useState} from 'react';
import {getNotes} from './service';
import {LocalStorageTitles} from './enums';
import {getLowerCaseString} from '../../utils';
import {ErrorMessage} from '../../common/errorMessage';
import {useVisibilityForm, useInputValue} from '../../hooks';
import {FormWithNotes, AccordionWithNotes } from './components';

import {setDataToLocalStorage, getParseLocalStorageData} from '../../services';
import {NotesComponentsType, NotesType} from './typings';

export const Notes: React.FC<NotesComponentsType> = (props) => {
    const city = getLowerCaseString(props.city);
    const country = getLowerCaseString(props.country);

    const findedCity: any[] = [];
    const notesWidget = LocalStorageTitles.NotesWidget;

    const [notes, setNotes] = useState<NotesType[]>(
        getParseLocalStorageData(notesWidget));
    const arrayCities = notes.map(({city}) => city);

    const [title, setTitle, changeInputValue] = useInputValue('');
    const [cityTitle, setCityTitle, changeInputCityValue] = useInputValue('');
    const [description, setDescription, changeTxtAreaValue] = useInputValue('');
    const [showForm, setShowForm, changeVisibilityForm] = useVisibilityForm(false);

    const addNotes = () => {
        const copyCity = city || getLowerCaseString(cityTitle);
        const newNote = {title, description, country, city: copyCity};
        const findedNotes = getNotes(notesWidget, newNote, copyCity, setNotes);

        setNotes([...findedNotes, newNote]);
        setDataToLocalStorage(
            notesWidget, JSON.stringify([...findedNotes, newNote])
        );

        setTitle('');
        setCityTitle('');
        setDescription('');
        setShowForm(false);
    };
    const removeNote = (title: string | undefined) => {
        const filteredNotes = getNotes(notesWidget).filter((obj: NotesType) => {
                return obj.title !== title;
            });

        if (!city || city !== filteredNotes[0]?.city) {
            setNotes(filteredNotes);
        } else {
            setNotes(filteredNotes.filter((el: NotesType) => el.city === city));
        }

        setDataToLocalStorage(notesWidget, JSON.stringify(filteredNotes));
    };

    for (const el of arrayCities) {
        if (!findedCity.includes(el)) {
            findedCity.push(el);
        }
    }

    useEffect(() => {
        getNotes(notesWidget, {} as NotesType, city);
    }, [notesWidget, city]);

    if (!country) {

        return (
            <ErrorMessage
                errorMessage={'Sorry, no notes...'}
            />
        );
    }

    if (city && findedCity.includes(city)) {

        return (
            <AccordionWithNotes
                city={city}
                notes={notes}
                title={title}
                country={country}
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
    }

    if (city && !findedCity.includes(city)) {

        return (
            <AccordionWithNotes
                city={city}
                notes={notes}
                title={title}
                country={country}
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
    }

    if (!city || (!findedCity.includes(city) && findedCity.length)) {

        if (!city && country) {

            return (
                <AccordionWithNotes
                    city={city}
                    notes={notes}
                    title={title}
                    country={country}
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
        }

        if (country) {

            return (
                <FormWithNotes
                    city={city}
                    notes={notes}
                    title={title}
                    country={country}
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
        }
    }

    return (
        <FormWithNotes
            city={city}
            notes={notes}
            title={title}
            country={country}
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
