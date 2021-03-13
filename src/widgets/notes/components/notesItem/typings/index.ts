import {NotesType} from 'src/widgets/notes/typings';

export type PropsType = {
    city: string | undefined;
    filteredNotesByCountry: NotesType[];
    removeNote: (title: string | undefined) => void;
};
