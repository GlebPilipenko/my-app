import {FC, useEffect, useState} from 'react';
import {PropsType, StateType} from './typings';
import {getInfoByCovid} from 'src/api/covidApi';
import {DefaultQueryParameters} from 'src/enums';
import {ErrorMessage} from 'src/common/errorMessage';
import {SVGDiagrams} from './components/svgDiagrams';

export const CovidDiagram: FC<PropsType> = ({
  country = DefaultQueryParameters.InvalidCountry
}) => {
  const [error, setError] = useState<string>('');
  const [state, setState] = useState<{} | StateType>({});

  const stateIsEmpty = (state: {} | StateType) => {
    for (let key in state) {
      if (state.hasOwnProperty(key))
        return false;
    }

    return true;
  };

  useEffect(() => {
    (async () => {
      try {
        if (!country) {
          return setError(`Country not found...`);
        }

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

  if (stateIsEmpty(state) || error) {
    return <ErrorMessage errorMessage={error} />;
  }

  return <SVGDiagrams state={state} />;
};
