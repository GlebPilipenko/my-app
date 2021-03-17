import {NotesType} from '../typings';
import {getParseLocalStorageData} from 'src/services/localStorage';

export const getNotes = (localStorageName: string, newNote?: NotesType,
                         city?: string, setNotes?: Function) => {
  const getLocalStorageData = getParseLocalStorageData(localStorageName);
  // debugger

  const foundNotes = getLocalStorageData
    .filter((obj: NotesType) => obj.city === city);

  if (setNotes) {
    if (!newNote?.city) {
      setNotes(foundNotes);
    } else {
      setNotes([...foundNotes, newNote]);
    }
  }

  // debugger
  return getLocalStorageData;
};
