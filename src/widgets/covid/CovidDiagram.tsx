import {FC, useEffect, useState} from 'react';
import {PropsType} from './typings';
import {getInfoByCovid} from 'src/api/covidApi';
import {DefaultQueryParameters} from 'src/enums';
import {ErrorMessage} from 'src/common/errorMessage';
import {SVGDiagrams} from './components/svgDiagrams';
import {CovidAPIType} from 'src/api/covidApi/typings';

export const CovidDiagram: FC<PropsType> = ({
  country = DefaultQueryParameters.InvalidCountry,
}) => {
  const [error, setError] = useState<string>('');
  const [state, setState] = useState<{} | CovidAPIType>({});

  const stateIsEmpty = (state: {} | CovidAPIType) => {
    for (let key in state) {
      return false;
    }
    return true;
  }

  useEffect(() => {
    (async () => {
      try {
        const infoByCovid = await getInfoByCovid(country);
        const {cases, deaths, recovered, active} = infoByCovid.data;

        setState({cases, deaths, recovered, active});
      } catch (e) {
        e.response
          ? setError(e.response.data.message)
          : setError(`Your request is blocked...`);
      }
    })();
  }, [country]);

  if (stateIsEmpty(state)) {
    return <ErrorMessage errorMessage={error} />;
  }

  return <SVGDiagrams state={state} />;
};
