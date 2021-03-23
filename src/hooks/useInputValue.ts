import {ChangeEvent, useState} from 'react';

export const useInputValue = (initValue: string) => {
  const [value, setValue] = useState<any>(initValue);
  const onChangeHandler = (e: ChangeEvent<any>) => setValue(e.currentTarget.value);

  return [value, setValue, onChangeHandler];
};
