import {NotesType} from '../../../../typings';

export type PropsType = {
    key: number;
    country: string;
    findedCity: string;
    notes: NotesType[];
    city: string | undefined;
    removeNote: (title: string | undefined) => void;
};
