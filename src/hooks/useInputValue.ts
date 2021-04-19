import {ChangeEvent, useState} from 'react';
import {ReturnUseInputValueType} from './typings';

export const useInputValue = (initValue: string): ReturnUseInputValueType => {
  const [count, setCount] = useState(0);
  const [value, setValue] = useState(initValue);

  const onChangeHandler = (
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const value = event.currentTarget.value;

    setValue(value);
    setCount(value.length);
  };

  return [count, value, setValue, onChangeHandler];
};
