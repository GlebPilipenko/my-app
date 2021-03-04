import {NotesType} from '../widget/notes/Notes';

export const serviceLocalStorage = (
    newTask?: NotesType, city?: string | undefined, setNotes?: Function) => {
    const lsObject = JSON.parse(localStorage.getItem('widget.Notes') || '[]');
    const findCity = lsObject.filter((obj: NotesType) => obj.city === city);

    if (setNotes) {
        if (!newTask || !newTask.city) {
            setNotes([...findCity]);
        } else {
            setNotes([...findCity, newTask]);
        }
    }

    return lsObject;
};