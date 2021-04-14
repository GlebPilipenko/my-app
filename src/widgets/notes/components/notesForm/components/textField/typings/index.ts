import {ChangeEvent} from 'react';

export type PropsType = {
  title: string;
  count: number;
  minLength: number;
  maxLength: number;
  fieldName: string;
  fieldStyle: string;
  errorMessage: string;
  showTextArea: boolean;
  changeValue: (event: ChangeEvent<HTMLInputElement & HTMLTextAreaElement>) => void;
};
