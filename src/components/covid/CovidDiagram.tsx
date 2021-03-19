import React, {useEffect, useState} from 'react';
import {SVGDiagrams} from './index';
import {PropsType} from './typings/';
import {getInfoByCovid} from 'src/api';
import {CovidAPIType} from 'src/api/typings';
import {ErrorMessage} from 'src/components/common/errorMessage';

export const CovidDiagram: React.FC<PropsType> = ({country}) => {
  const [error, setError] = useState<string>('');
  const [state, setState] = useState<any | CovidAPIType>(null);

  useEffect(() => {
    (async () => {
      try {
        const infoByCovid = await getInfoByCovid(country);

        setState(Object.entries(infoByCovid.data));
      } catch (e) {
        !e.response
          ? setError('Your request is blocked...')
          : setError(e.response.data.message);
      }
    })();
  }, [country]);

  if (error.length) {
    return <ErrorMessage errorMessage={error} />;
  }

  if (state.length >= 200) {
    return <ErrorMessage errorMessage={'Country not found...'} />;
  }

  return <SVGDiagrams state={state} error={error} />;
};
