import {ChangeEvent, useState} from 'react';
import {useCountValue} from './useCountValue';

export const useInputValue = (initValue: string) => {
  const [count, getNewCountValue] = useCountValue(0);
  const [value, setValue] = useState<any>(initValue);

  const onChangeHandler = (
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setValue(event.currentTarget.value);
    getNewCountValue(event);
  };

  return [count, value, setValue, onChangeHandler];
};
