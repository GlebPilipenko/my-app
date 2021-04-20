import {FC, useCallback, useEffect, useState} from 'react';
import {getResponse} from './utils';
import {PropsType} from './typings';
import {ViewModeTitles} from './enums';
import style from './Images.module.css';
import {useErrorValue} from 'src/hooks';
import {getLowerCaseString} from 'src/utils';
import {DefaultQueryParameters} from 'src/enums';
import {Carousel} from 'react-responsive-carousel';
import {HitsType} from 'src/api/imagesApi/typings';
import {ErrorMessage} from 'src/common/errorMessage';
import {errorMessage, requestIsBlocked} from 'src/constants';
import 'react-responsive-carousel/lib/styles/carousel.min.css';

export const Images: FC<PropsType> = ({
  city = DefaultQueryParameters.InvalidCity,
  mode = DefaultQueryParameters.InvalidViewMode,
  country = DefaultQueryParameters.InvalidCountry,
}) => {
  const [error, setError] = useErrorValue(``);
  const [state, setState] = useState<HitsType[]>([]);

  const invalidCity = DefaultQueryParameters.InvalidCity;
  const invalidCountry = DefaultQueryParameters.InvalidCountry;

  const isInvalidCity = (city === invalidCity);
  const isInvalidCountry = (country === invalidCountry);
  const getLowerCaseViewMode = getLowerCaseString(mode);

  const setPhotosInState = useCallback((result: HitsType[]) => {
    if (result.length === 0) {
      return setError(errorMessage);
    }

    return setState(result);
  }, [setError]);
  const renderPhotos = () => {
    const arrayOfImagePaths = state.map((obj: HitsType) => `${obj.webformatURL}`);

    if (getLowerCaseViewMode === ViewModeTitles.Masonry) {
      return (
        <div className={style.image_grid}>
          {arrayOfImagePaths.map((path: string) => {
            const key = `${path}${Date.now()}`;

            return (
              <div key={key} className={style.image_item}>
                <img src={path} alt='images' />
              </div>
            );
          })}
        </div>
      );
    }

    return (
      <Carousel
        showThumbs={false}
        infiniteLoop={true}
        dynamicHeight={true}
      >
        {arrayOfImagePaths.map((path: string) => {
          const key = `${path}${Date.now()}`;

          return (
            <div key={key} className={style.container}>
              <img src={path} alt='images' />
            </div>
          );
        })}
      </Carousel>
    );
  };

  useEffect(() => {
    (async () => {
      try {
        await getResponse(
          city, country, isInvalidCity, invalidCountry, isInvalidCountry,
          setError, setPhotosInState
        );
      } catch (e) {
        !e.response ? setError(requestIsBlocked)
          : setError(e.response.data.message);
      }
    })();
  }, [city, country, setPhotosInState, setError,
    isInvalidCity, isInvalidCountry, invalidCity, invalidCountry]);

  if (!state || state.length === 0) {
    return <ErrorMessage errorMessage={error} />;
  }

  return renderPhotos();
};
