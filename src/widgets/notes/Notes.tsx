import React, {useEffect, useState} from 'react';
import {getNotes} from './service';
import {LocalStorageTitles} from './enums';
import {getLowerCaseString} from 'src/utils';
import {AccordionWithNotes} from './components';
import {ErrorMessage} from 'src/common/errorMessage';
import {NotesComponentsType, NotesType} from './typings';
import {useVisibilityForm, useInputValue} from 'src/hooks';
import {setDataToLocalStorage, getParseLocalStorageData} from 'src/services';

export const Notes: React.FC<NotesComponentsType> = ({
  city: cityToLowerCase = '',
  country: countryToLowerCase = '',
}) => {
  const city = getLowerCaseString(cityToLowerCase);
  const country = getLowerCaseString(countryToLowerCase);

  const foundCity: any[] = [];
  const notesWidget = LocalStorageTitles.NotesWidget;

  const [notes, setNotes] = useState<NotesType[]>(
    getParseLocalStorageData(notesWidget)
  );
  const arrayCities = notes.map(({city}) => city);

  const [title, setTitle, changeInputValue] = useInputValue('');
  const [cityTitle, setCityTitle, changeInputCityValue] = useInputValue('');
  const [description, setDescription, changeTxtAreaValue] = useInputValue('');
  const [showForm, setShowForm, changeVisibilityForm] = useVisibilityForm(false);

  const addNotes = () => {
    const copyCity = city || getLowerCaseString(cityTitle);
    const newNote = {title, description, country, city: copyCity};
    const foundNotes = getNotes(notesWidget, newNote, copyCity, setNotes);

    setNotes([...foundNotes, newNote]);
    setDataToLocalStorage(
      notesWidget, JSON.stringify([...foundNotes, newNote])
    );

    setTitle('');
    setCityTitle('');
    setDescription('');
    setShowForm(false);
  };
  const removeNote = (title?: string) => {
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

  useEffect(() => {
    getParseLocalStorageData(notesWidget);
    // getNotes(notesWidget);

    for (const el of arrayCities) {
      if (!foundCity.includes(el)) {
        foundCity.push(el);
      }
    }
  }, [notesWidget, city]);

  if (!country) {
    return <ErrorMessage errorMessage={'Sorry, no notes...'} />
  }

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
};
