import {ChangeEvent} from 'react';
import {NotesType} from 'src/widgets/notes/typings';

export type PropsType = {
    city?: string;
    title: string;
    country: string;
    showForm: boolean;
    cityTitle: string;
    notes: NotesType[];
    description: string;
    addNotes: () => void;
    changeVisibilityForm: () => void;
    removeNote: (title?: string) => void;
    changeInputValue: (e: ChangeEvent<HTMLInputElement>) => void;
    changeInputCityValue: (e: ChangeEvent<HTMLInputElement>) => void;
    changeTxtAreaValue: (e: ChangeEvent<HTMLTextAreaElement>) => void;
};
