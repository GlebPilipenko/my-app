import { NotesType } from '../../../types';

export type PropsType = {
    country?: string;
    notes: NotesType[];
    city: string | undefined;
    removeNote: (title: string | undefined) => void;
};
