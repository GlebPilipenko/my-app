import React, {useEffect, useState} from 'react';
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

  const notesWidget = LocalStorageTitles.NotesWidget;

  const [notes, setNotes] = useState<NotesType[]>(
    getParseLocalStorageData(notesWidget)
  );


  const [title, setTitle, changeInputValue] = useInputValue('');
  const [cityTitle, setCityTitle, changeInputCityValue] = useInputValue('');
  const [description, setDescription, changeTxtAreaValue] = useInputValue('');
  const [showForm, setShowForm, changeVisibilityForm] = useVisibilityForm(false);

  const addNotes = () => {
    const copyCity = city || getLowerCaseString(cityTitle);
    const newNote = {title, description, country, city: copyCity};
    const notesFromLocalStorage = getParseLocalStorageData(notesWidget);

    setNotes([...notesFromLocalStorage, newNote]);
    setDataToLocalStorage(notesWidget, JSON.stringify(
      [...notesFromLocalStorage, newNote]
    ));

    setTitle('');
    setCityTitle('');
    setDescription('');
    setShowForm(false);
  };
  const removeNote = (title: string) => {
    const filteredNotesFromLocalStorage = getParseLocalStorageData(notesWidget)
      .filter((obj: NotesType) => obj.title !== title);

    if (!city || city !== filteredNotesFromLocalStorage[0].city) {
      setNotes(filteredNotesFromLocalStorage);
    } else {
      setNotes(filteredNotesFromLocalStorage
        .filter((el: NotesType) => el.city === city));
    }

    setDataToLocalStorage(
      notesWidget, JSON.stringify(filteredNotesFromLocalStorage)
    );
  };

  useEffect(() => {
    const foundCity: string[] = [];
    const arrayOfCities = notes.map(({city}) => city);

    for (const el of arrayOfCities) {
      if (!foundCity.includes(el as string)) {
        foundCity.push(el as string);
      }
    }
  }, [notesWidget, notes]);

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
