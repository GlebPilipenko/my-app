import {useState} from 'react';

export const CustomInputHook = (initValue: string) => {
    const [value, setValue] = useState(initValue);
    const onChangeHandler = (e: any) => setValue(e.currentTarget.value);

    return {
        value, onChangeHandler
    }
}