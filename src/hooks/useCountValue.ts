import {useState, KeyboardEvent} from 'react';

export const useCountValue = (initValue: any) => {
  const [value, setValue] = useState<any>(initValue);

  const getNewCountValue = (event: KeyboardEvent) => {
    debugger
    if (event.key === 'Delete') {
      debugger
      return setValue(value - 1);
    }

    setValue(value + 1);
  }

  return [value, getNewCountValue];
};
