import {useState} from 'react';
import {ReturnUseVisibilityFormType} from './typings';

export const useVisibilityForm = (initValue: boolean)
  : ReturnUseVisibilityFormType => {
  const [value, setValue] = useState<boolean>(initValue);
  const onChangeHandler = () => setValue(true);

  return [value, setValue, onChangeHandler];
};
