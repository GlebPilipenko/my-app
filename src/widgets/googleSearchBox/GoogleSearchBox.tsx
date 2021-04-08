import {useEffect} from 'react';
import {useInputValue} from 'src/hooks';
import {searchBoxAutocomplete} from './utils';
import style from './GoogleSearchBox.module.css';

export const GoogleSearchBox = () => {
  const [value, , changeInputValue] = useInputValue('');

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
    </div>
  );
};
