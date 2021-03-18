import {useState} from 'react';

export const useVisibilityForm = (initValue: boolean) => {
  const [value, setValue] = useState<any>(initValue);
  const onChangeHandler = () => setValue(true);

  return [value, setValue, onChangeHandler];
};
