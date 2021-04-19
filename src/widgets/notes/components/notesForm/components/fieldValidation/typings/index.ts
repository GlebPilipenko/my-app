import {ReactNode} from 'react';

export type PropsType = {
  children: ReactNode;
  valueLength: number;
  errorMessage: string;
  maxValueLength: number;
  setState: (value: any) => void;
};
