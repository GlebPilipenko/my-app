import {useEffect} from 'react';
import {useInputValue} from 'src/hooks';
import {searchBoxAutocomplete} from './utils';

export const GoogleSearchBox = () => {
  const [value, , changeInputValue] = useInputValue('');

  useEffect(() => {
    searchBoxAutocomplete();
  });

  return <input
    value={value}
    id={'searchTextField'}
    onChange={changeInputValue}
    autoComplete={'on'}
  />;
};
