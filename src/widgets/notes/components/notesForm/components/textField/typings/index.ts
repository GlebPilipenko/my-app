import {ChangeEvent} from 'react';

export type PropsType = {
  title: string;
  count: number;
  maxLength: number;
  fieldName: string;
  countStyle: string;
  fieldStyle: string;
  messageStyle: string;
  errorMessage: string;
  showTextArea: boolean;
  textFieldError: boolean;
  setPropsCount: (value: number) => void;
  setMaxLength: (value: number) => void;
  changeValue: (event: ChangeEvent<HTMLInputElement & HTMLTextAreaElement>) => void;
};
