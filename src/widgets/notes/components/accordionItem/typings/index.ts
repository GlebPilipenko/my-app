import { NotesType } from '../../../typings';

export type PropsType = {
    index: number;
    findedCity: string;
    notes: NotesType[];
    city: string | undefined;
    removeNote: (title: string | undefined) => void;
};
