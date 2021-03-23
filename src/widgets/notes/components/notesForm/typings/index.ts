import {ChangeEvent} from 'react';

export type PropsType = {
    city?: string;
    title: string;
    showForm: boolean;
    cityTitle: string;
    description: string;
    changeVisibilityForm: () => void;
    addNotes: (noteID: string) => void;
    changeInputValue: (e: ChangeEvent<HTMLInputElement>) => void;
    changeInputCityValue: (e: ChangeEvent<HTMLInputElement>) => void;
    changeTxtAreaValue: (e: ChangeEvent<HTMLTextAreaElement>) => void;
};
