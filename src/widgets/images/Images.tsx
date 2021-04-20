import {FC, useEffect, useState} from 'react';
import {PropsType} from './typings';
import {ViewModeTitles} from './enums';
import style from './Images.module.css';
import {useInputValue} from 'src/hooks';
import {errorMessage, requestIsBlocked} from 'src/constants';
import {getLowerCaseString} from 'src/utils';
import {DefaultQueryParameters} from 'src/enums';
import {Carousel} from 'react-responsive-carousel';
import {ErrorMessage} from 'src/common/errorMessage';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import {getImagesCity, getImagesCountry} from 'src/api/imagesApi';
import {HitsType, ImagesAPIType} from 'src/api/imagesApi/typings';

export const Images: FC<PropsType> = ({
  city = DefaultQueryParameters.InvalidCity,
  country = DefaultQueryParameters.InvalidCountry,
  viewmode = DefaultQueryParameters.InvalidViewMode,
}) => {
  const [error, setError] = useInputValue(``);
  const [state, setState] = useState<ImagesAPIType[]>([]);
  debugger

  const invalidCity = DefaultQueryParameters.InvalidCity;
  const invalidCountry = DefaultQueryParameters.InvalidCountry;

  const isInvalidCity = (city === invalidCity);
  const isInvalidCountry = (country === invalidCountry);
  const getLowerCaseViewMode = getLowerCaseString(viewmode);

  const renderPhotos = () => {
    const arrayOfImagePaths = state
      .map((obj: HitsType) => `${obj.webformatURL}`);

    if (getLowerCaseViewMode === ViewModeTitles.Masonry) {
      return (
        <div className={style.image_grid}>
          {arrayOfImagePaths.map((path: string) => {
            const key = `${path}${Date.now()}`;

            return (
              <div
                key={key}
                className={style.image_item}>
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
            <div
              key={key}
              className={style.container}
            >
              <img
                src={path}
                alt='images'
              />
            </div>
          );
        })}
      </Carousel>
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
        !e.response ? setError(requestIsBlocked)
          : setError(e.response.data.message);
      }
    })();
  }, [city, country,
    isInvalidCity, isInvalidCountry, invalidCity, invalidCountry, setError]);

  if (!state || state.length === 0) {
    return <ErrorMessage errorMessage={error} />;
  }

  return renderPhotos();
};
