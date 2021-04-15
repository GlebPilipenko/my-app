import {ReactNode} from 'react';

export type PropsType = {
  fieldName: string;
  children: ReactNode;
  valueLength: number;
  errorMessage: string;
  maxValueLength: number;
};
