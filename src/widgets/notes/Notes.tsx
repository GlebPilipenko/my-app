import {FC, useEffect, useState} from 'react';
import {LocalStorageTitles} from './enums';
import {getLowerCaseString} from 'src/utils';
import {NotesType, PropsType} from './typings';
import {AccordionWithNotes} from './components';
import {ErrorMessage} from 'src/common/errorMessage/';
import {useVisibilityForm, useInputValue} from 'src/hooks';
import {setDataToLocalStorage, getParseLocalStorageData} from 'src/services';

export const Notes: FC<PropsType> = ({
  city: cityToLowerCase = '',
  country: countryToLowerCase = '',
}) => {
  const notesWidget = LocalStorageTitles.NotesWidget;

  const city = getLowerCaseString(cityToLowerCase);
  const country = getLowerCaseString(countryToLowerCase);

  const [notes, setNotes] = useState<NotesType[]>(
    getParseLocalStorageData(notesWidget)
  );

  const [title, setTitle, changeInputValue] = useInputValue('');
  const [cityTitle, setCityTitle, changeInputCityValue] = useInputValue('');
  const [description, setDescription, changeTxtAreaValue] = useInputValue('');
  const [showForm, setShowForm, changeVisibilityForm] = useVisibilityForm(false);

  const addNotes = (noteID: string) => {
    const copyCity = city || getLowerCaseString(cityTitle);
    const newNote = {noteID, title, description, country, city: copyCity};
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
  const removeNote = (noteID: string) => {
    const filteredNotesFromLocalStorage = getParseLocalStorageData(notesWidget)
      .filter((note: NotesType) => note.noteID !== noteID);
    const emptyLocalStorage = filteredNotesFromLocalStorage.length === 0;

    if (!city || emptyLocalStorage || city !== filteredNotesFromLocalStorage[0].city) {
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
