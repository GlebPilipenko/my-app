import {FC, useEffect, useState} from 'react';
import {PropsType} from './typings';
import {getInfoByCovid} from 'src/api';
import {DefaultQueryParameters} from 'src/enums';
import {ErrorMessage} from 'src/common/errorMessage';
import {SVGDiagrams} from './components/svgDiagrams';
import {CovidAPIType} from 'src/api/covidApi/typings';

export const CovidDiagram: FC<PropsType> = ({
  country = DefaultQueryParameters.InvalidCountry
}) => {
  const [error, setError] = useState<string>('');
  const [state, setState] = useState<any | CovidAPIType[]>(null);

  const numCountriesInWorld = 193;

  useEffect(() => {
    (async () => {
      try {
        const infoByCovid = await getInfoByCovid(country);
        setState(Object.entries(infoByCovid.data));
      } catch (e) {
        e.response
          ? setError(e.response.data.message)
          : setError(`Your request is blocked...`);
      }
    })();
  }, [country]);

  if (!state) {
    return <ErrorMessage errorMessage={error} />;
  }

  if (state.length >= numCountriesInWorld) {
    return <ErrorMessage errorMessage={`Country not found...`} />;
  }

  return <SVGDiagrams state={state} />;
};
