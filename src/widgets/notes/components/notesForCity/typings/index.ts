import { NotesType } from '../../../typings';

export type PropsType = {
    country?: string;
    city: string | undefined;
    filteredNotesByCountry: NotesType[];
    removeNote: (title: string | undefined) => void;
};
