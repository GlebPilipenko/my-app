import {ChangeEvent} from 'react';

export type PropsType = {
  value: string;
  fieldName: string;
  valueLength: number;
  isValidValue: boolean;
  onChange: (e: ChangeEvent<HTMLTextAreaElement>) => void;
};
