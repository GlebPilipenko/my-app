import {NotesType} from '../Notes';
import {getParseLocalStorageData} from '../../../services/localStorage';

export const getNotes = (
    localStorageName: string, newNote?: NotesType,
    city?: string | undefined, setNotes?: Function
) => {
    const getLocalStorageData = getParseLocalStorageData(localStorageName, []);

    // const findedNotes = getLocalStorageData
    //     .filter((obj: NotesType) => obj.city === city);

    if (setNotes) {
        if (!newNote || !newNote.city) {
            setNotes(getLocalStorageData);
        } else {
            setNotes([...getLocalStorageData, newNote]);
        }
    }

    return getLocalStorageData;
};