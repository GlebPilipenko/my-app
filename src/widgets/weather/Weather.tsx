import {FC, useEffect, useState} from 'react';
import {PropsType} from './typings';
import {getWeather} from 'src/api/weatherApi';
import {getCapitalizedString} from 'src/utils';
import {ErrorMessage} from 'src/common/errorMessage';
import {WeatherAPIType} from 'src/api/weatherApi/typings';
import {InformationOfCity} from './components/informationOfCity';

export const Weather: FC<PropsType> = ({
  city = 'invalid_city',
}) => {
  const [state, setState] = useState<null | WeatherAPIType>(null);
  const [error, setError] = useState<string>('');
  const getErrorMessage = (error: string) => {
    const message = getCapitalizedString(error);

    if (message === 'Nothing to geocode') {
      return 'Enter the correct city.';
    }

    if (message === 'Bad query') {
      return 'There are no attributes for correct display.';
    }

    return message;
  };

  useEffect(() => {
    (async () => {
      try {
        const res = await getWeather(city);
        setState(res.data);
      } catch (e) {
        !e.response
          ? setError('Weather request error, please try again later.')
          : setError(getErrorMessage(e.response.data.message));
      }
    })();
  }, [city]);

  if (!state) {
    return <ErrorMessage errorMessage={error} />;
  }

  return <InformationOfCity state={state} />;
};
