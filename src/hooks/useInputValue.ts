
import {ChangeEvent, useState} from 'react';
import {ReturnUseInputValueType} from './typings';

export const useInputValue = (initValue: string): ReturnUseInputValueType => {
  const [value, setValue] = useState<string>(initValue);

  const onChangeHandler = (
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const value = event.currentTarget.value;

    setValue(value);
  };

  return [value, setValue, onChangeHandler];
};
