import {FC, useEffect, useState} from 'react';
import {PropsType} from './typings';
import {DefaultQueryParameters} from 'src/enums';
import {ErrorMessage} from 'src/common/errorMessage';
import {getImagesCity, getImagesCountry} from 'src/api/imagesApi';
import {HitsType, ImagesAPIType} from 'src/api/imagesApi/typings';
import style from './Images.module.css';

export const Images: FC<PropsType> = ({
  city = DefaultQueryParameters.InvalidCity,
  country = DefaultQueryParameters.InvalidCountry,
}) => {
  const [error, setError] = useState<string>('');
  const [state, setState] = useState<any | ImagesAPIType>(null);

  const invalidCity = DefaultQueryParameters.InvalidCity;
  const invalidCountry = DefaultQueryParameters.InvalidCountry;
  const isInvalidCity = (city === invalidCity);
  const isInvalidCountry = (country === invalidCountry);
  const errorMessage = `Error, enter valid city or country...`;

  const renderPhotos = () => {
    const photoPath = state.map((obj: HitsType) => `${obj.webformatURL}`);

    return (
      <div className={style.image_grid}>
        {photoPath.map((path: string) => {
          const key = `${path}${Date.now()}`;

          return (
            <div
              key={key}
              className={style.image_item}>
              <img src={path} alt="images" />
            </div>
          );
        })}
      </div>
    );
  };

  useEffect(() => {
    (async () => {
      try {
        if ((!city || isInvalidCity) && (!country || isInvalidCountry)) {
          return setError(errorMessage);
        }

        if (city) {
          const res = await getImagesCity(city);
          const hits = res.data.hits;

          if (hits.length === 0) {
            return setError(errorMessage);
          }

          return setState(res.data.hits);
        }

        if (country) {
          const res = await getImagesCountry(country);
          const hits = res.data.hits;

          if (hits.length === 0) {
            return setError(errorMessage);
          }

          return setState(res.data.hits);
        }

      } catch (e) {
        !e.response ? setError('Your request is blocked')
          : setError(e.response.data.message);
      }
    })();
  }, [city, country, isInvalidCity, isInvalidCountry,
    invalidCity, invalidCountry, errorMessage]);

  if (!state || state.length === 0) {
    return <ErrorMessage errorMessage={error} />;
  }

  return renderPhotos();
};
