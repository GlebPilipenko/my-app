import { ChangeEvent } from 'react';
import { NotesType } from '../../../types';

export type PropsType = {
    title: string;
    country?: string;
    notes: NotesType[];
    showForm: boolean;
    cityTitle: string;
    description: string;
    addNotes: () => void;
    findedCountry?: string[];
    city: string | undefined;
    changeVisibilityForm: () => void;
    removeNote: (title: string | undefined) => void;
    changeInputValue: (e: ChangeEvent<HTMLInputElement>) => void;
    changeInputCityValue: (e: ChangeEvent<HTMLInputElement>) => void;
    changeTxtAreaValue: (e: ChangeEvent<HTMLTextAreaElement>) => void;
};
