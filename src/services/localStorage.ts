import {getNotes} from '../widgets/notes/service/getNotes';

export const setDataToLocalStorage = (localStorageName: string, stringData: string) => {
    return localStorage.setItem(localStorageName, stringData);
};
export const getParseLocalStorageData = (localStorageName: string) => {
    return JSON.parse(localStorage.getItem(localStorageName) || '[]');
};
