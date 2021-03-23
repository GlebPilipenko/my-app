import {FC, useEffect, useState} from 'react';
import {PropsType} from './typings';
import {getInfoByCovid} from 'src/api';
import {SVGDiagrams} from './components/svgDiagrams';
import {CovidAPIType} from 'src/api/covidApi/typings';
import {ErrorMessage} from '../../common/errorMessage';

export const CovidDiagram: FC<PropsType> = ({country = 'invalid_country'}) => {
  const [error, setError] = useState<string>('');
  const [state, setState] = useState<any | CovidAPIType[]>(null);

  useEffect(() => {
    (async () => {
      try {
        const infoByCovid = await getInfoByCovid(country);
        setState(Object.entries(infoByCovid.data));
      } catch (e) {
        e.response
          ? setError(e.response.data.message)
          : setError('Your request is blocked...');
      }
    })();
  }, [country]);

  if (!state) {
    return <ErrorMessage errorMessage={error} />;
  }

  if (state.length >= 200) {
    return <ErrorMessage errorMessage={`Country not found...`} />;
  }

  return <SVGDiagrams state={state} />;
};
