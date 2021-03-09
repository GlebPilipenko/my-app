import {NotesType} from '../typings';
import {getParseLocalStorageData} from '../../../services/localStorage';

export const getNotes = (localStorageName: string, newNote?: NotesType,
                         city?: string | undefined, setNotes?: Function) => {
    const getLocalStorageData = getParseLocalStorageData(localStorageName);

    const findedNotes = getLocalStorageData
        .filter((obj: NotesType) => obj.city === city);

    if (setNotes) {
        if (!newNote || !newNote.city) {
            setNotes(findedNotes);
        } else {
            setNotes([...findedNotes, newNote]);
        }
    }

    return getLocalStorageData;
};
