import {NotesType} from 'src/widgets/notes/typings';

export type PropsType = {
    key: number;
    city?: string;
    country: string;
    findedCity: string;
    notes: NotesType[];
    removeNote: (title?: string) => void;
};
