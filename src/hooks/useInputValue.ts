import {ChangeEvent, useState} from 'react';

export const useInputValue = (initValue: string) => {
  const [value, setValue] = useState<any>(() => initValue);
  const [count, setCount] = useState<any>('');

  const onChangeHandler = (
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const value = event.currentTarget.value;

    setValue(value);
    setCount(value.length);
  };

  return [count, value, setValue, onChangeHandler];
};
