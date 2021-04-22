import {ChangeEvent} from 'react';

export type ReturnUseVisibilityFormType = [
  boolean, (value: boolean) => void, () => void
];

export type ReturnUseInputValueType = [string, (value: string) => void,
  (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void];

export type ReturnUseErrorValueType = [string, (value: string) => void];

export type ReturnUseCountValueType = [number, (value: number) => void];
