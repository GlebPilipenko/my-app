import {ChangeEvent} from 'react';

export type PropsType = {
  value: string;
  valueLength: number;
  maxValueLength: number;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
};
