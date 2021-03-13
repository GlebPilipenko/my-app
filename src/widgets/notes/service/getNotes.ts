import {NotesType} from '../typings';
import {getParseLocalStorageData} from 'src/services/localStorage';

export const getNotes = (localStorageName: string, newNote?: NotesType,
                         city?: string, setNotes?: Function) => {
    const getLocalStorageData = getParseLocalStorageData(localStorageName);

    const findedNotes = getLocalStorageData
        .filter((obj: NotesType) => obj.city === city);

    if (setNotes) {
        if (!newNote?.city) {
            setNotes(findedNotes);
        } else {
            setNotes([...findedNotes, newNote]);
        }
    }

    return getLocalStorageData;
};
