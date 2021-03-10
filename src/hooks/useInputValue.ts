import {useState} from 'react';

export const useInputValue = (initValue: string) => {
    const [value, setValue] = useState<any>(initValue);
    const onChangeHandler = (e: any) => setValue(e.currentTarget.value);

    return [value, setValue, onChangeHandler];
};
