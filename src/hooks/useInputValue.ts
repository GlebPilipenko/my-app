import {ChangeEvent, useState} from 'react';
import {ReturnUseInputValueType} from './typings';

export const useInputValue = (initValue: string): ReturnUseInputValueType => {
  const [count, setCount] = useState<number>(0);
  const [value, setValue] = useState<string>(initValue);

  const onChangeHandler = (
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const value = event.currentTarget.value;

    setValue(value);
    setCount(value.length);
  };

  return [count, value, setValue, onChangeHandler];
};
