import {useState} from 'react';

export const UseInputValue = (initValue: string) => {
    const [value, setValue] = useState(initValue);
    const onChangeHandler = (e: any) => setValue(e.currentTarget.value);

    return {
        value, setValue, onChangeHandler
    }
}