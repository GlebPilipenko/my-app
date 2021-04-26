import {useState} from 'react';
import {ReturnUseCountValueType} from './typings';

export const useCountValue = (initValue: number): ReturnUseCountValueType => {
  const [count, setCount] = useState<number>(initValue);

  return [count, setCount];
};
