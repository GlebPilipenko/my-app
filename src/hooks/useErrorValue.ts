import {useState} from 'react';
import {ReturnUseErrorValueType} from './typings';

export const useErrorValue = (initValue: string): ReturnUseErrorValueType => {
  const [error, setError] = useState<string>(initValue);

  return [error, setError];
};
