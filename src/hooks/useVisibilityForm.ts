import {useState} from 'react';
import {ReturnUseVisibilityFormType} from './typings';

export const useVisibilityForm = (initValue: boolean)
  : ReturnUseVisibilityFormType => {
  const [value, setValue] = useState(initValue);
  const onChangeHandler = () => setValue(true);

  return [value, setValue, onChangeHandler];
};
