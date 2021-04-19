import {ChangeEvent} from 'react';

export type ReturnUseVisibilityFormType = [
  boolean, (value: boolean) => void, () => void
];

export type ReturnUseInputValueType = [number, string, (value: string) => void,
  (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void];
