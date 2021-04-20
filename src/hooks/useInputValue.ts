import {ChangeEvent, useState} from 'react';
import {ReturnUseInputValueType} from './typings';

export const useInputValue = (initValue: string): ReturnUseInputValueType => {
  const [value, setValue] = useState<string>(initValue);

  const onChangeHandler = (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => (
    setValue(event.currentTarget.value)
  );

  return [value, setValue, onChangeHandler];
};
