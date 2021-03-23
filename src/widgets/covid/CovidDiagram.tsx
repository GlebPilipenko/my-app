import {FC, useEffect, useState} from 'react';
import {PropsType} from './typings';
import {getInfoByCovid} from 'src/api';
import {SVGDiagrams} from './components/svgDiagrams';
import {ErrorMessage} from 'src/common/errorMessage';
import {CovidAPIType} from 'src/api/covidApi/typings';

export const CovidDiagram: FC<PropsType> = ({country = 'invalid_country'}) => {
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

  return <SVGDiagrams state={state} error={error} />;
};
