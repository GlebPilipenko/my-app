import { ChangeEvent } from "react";
import { NotesType } from '../../../typings';

export type PropsType = {
    title: string;
    findedCity: any[];
    showForm: boolean;
    cityTitle: string;
    notes: NotesType[];
    description: string;
    addNotes: () => void;
    city: string | undefined;
    changeVisibilityForm: () => void;
    removeNote: (title: string | undefined) => void;
    changeInputValue: (e: ChangeEvent<HTMLInputElement>) => void;
    changeInputCityValue: (e: ChangeEvent<HTMLInputElement>) => void;
    changeTxtAreaValue: (e: ChangeEvent<HTMLTextAreaElement>) => void;
};
