import {ChangeEvent} from 'react';

export type PropsType = {
  value: string;
  fieldName: string;
  valueLength: number;
  maxValueLength: number;
  onChange: (e: ChangeEvent<HTMLTextAreaElement>) => void;
};
