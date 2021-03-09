import { ChangeEvent } from "react";

export type PropsType = {
    title: string;
    showForm: boolean;
    cityTitle: string;
    description: string;
    addNotes: () => void;
    city: string | undefined;
    changeInputValue: (e: ChangeEvent<HTMLInputElement>) => void;
    changeInputCityValue: (e: ChangeEvent<HTMLInputElement>) => void;
    changeTxtAreaValue: (e: ChangeEvent<HTMLTextAreaElement>) => void;
};
