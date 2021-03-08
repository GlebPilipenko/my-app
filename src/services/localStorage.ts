import {NotesType} from '../widgets/notes/Notes';
import {getNotes} from '../widgets/notes/service/getNotes';

enum LocalStorageTitles {
    NotesWidget = 'widget.Notes',
}

export const setDataToLocalStorage = (localStorageName: string, stringData: string) => {
    return localStorage.setItem(localStorageName, stringData);
};
export const getParseLocalStorageData = (localStorageName: string) => {
    return JSON.parse(localStorage.getItem(localStorageName) || '[]');
};

export const serviceLocalStorage = (localStorageName: string, newNote?: NotesType,
                                    city?: string | undefined, setNotes?: Function) => {
    switch (localStorageName) {
        case `${LocalStorageTitles.NotesWidget}`:
            return getNotes(localStorageName, newNote, city, setNotes);
    }
};
