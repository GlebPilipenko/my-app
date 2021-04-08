import {useEffect} from 'react';
import {useInputValue} from 'src/hooks';
import {searchBoxAutocomplete} from './utils';
import style from './GoogleSearchBox.module.css';
import {getParseLocalStorageData} from '../../services';
import {LocalStorageTitles} from './enums';

export const GoogleSearchBox = () => {
  const [value, , changeInputValue] = useInputValue('');
  const googleSearchBoxWidget = LocalStorageTitles.GoogleSearchBox;
  const dataFromLocalStorage = getParseLocalStorageData(googleSearchBoxWidget);

  debugger

  useEffect(() => {
    searchBoxAutocomplete();
  });

  return (
    <div className={style.search_box__container}>
      <input
        value={value}
        autoComplete={'on'}
        id={'searchTextField'}
        onChange={changeInputValue}
        className={style.search__box}
      />
      {dataFromLocalStorage.map((el: any) => {
        debugger
        return el.photos?.map((el: any) => {
          return el.html_attributions
        })
      })}
    </div>
  );
};
