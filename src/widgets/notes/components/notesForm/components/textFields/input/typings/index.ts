import {ChangeEvent} from 'react';

export type PropsType = {
  value: string;
  fieldName: string;
  valueLength: number;
  isValidValue: boolean;
  maxValueLength: number;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
};
