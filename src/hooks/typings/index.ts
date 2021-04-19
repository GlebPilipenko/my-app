import {ChangeEvent} from 'react';

export type ReturnUseInputValueType = [number, string, (value: string) => void,
  (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void];

export type ReturnUseVisibilityFormType = [
  boolean, (value: boolean) => void ,() => void
];
