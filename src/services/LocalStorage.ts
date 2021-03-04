import {useCallback} from 'react';
import {NotesType} from '../widget/notes/Notes';

export const serveiceLocalStorage = (
    newTask?: NotesType, city?: string | undefined, setNotes?: Function
) => {
    const lsObject = JSON.parse(localStorage.getItem('widget.Notes') || '[]');
    const findCity = lsObject.filter((obj: NotesType) => obj.city === city);

    if (!newTask) {
        // @ts-ignore
        setNotes([...findCity]);
    } else  {
        // @ts-ignore
        setNotes([...findCity, newTask]);
    }

    return lsObject;
};