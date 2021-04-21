import {FC, useCallback, useEffect, useState} from 'react';
import {PropsType} from './typings';
import {useErrorValue} from 'src/hooks';
import {DefaultQueryParameters} from 'src/enums';
import {HitsType} from 'src/api/imagesApi/typings';
import {ErrorMessage} from 'src/common/errorMessage';
import {Masonry, CarouselComponent} from './components';
import {getResponse, getHelperConstants} from './utils';
import {errorMessage, requestIsBlocked} from 'src/constants';

export const Images: FC<PropsType> = ({
  city = DefaultQueryParameters.InvalidCity,
  country = DefaultQueryParameters.InvalidCountry,
  masonry: propsMasonry = DefaultQueryParameters.InvalidMasonryViewMode,
  carousel: propsCarousel = DefaultQueryParameters.InvalidCarouselViewMode,
}) => {
  const [error, setError] = useErrorValue(``);
  const [data, setData] = useState<HitsType[]>([]);

  const {
    invalidCity, isInvalidCity, invalidCountry, isInvalidCountry,
    isValidMasonryViewMode, isValidCarouselViewMode, isInvalidMasonryViewMode,
    isInvalidCarouselViewMode
  } = getHelperConstants(city, country, propsMasonry, propsCarousel);

  const setPhotosInState = useCallback((result: HitsType[]) => {
    if (result.length === 0) {
      return setError(errorMessage);
    }

    return setData(result);
  }, [setError]);
  const renderImages = () => {
    if (isValidMasonryViewMode) {
      return <Masonry data={data} />;
    }

    if (isValidCarouselViewMode) {
      return <CarouselComponent data={data} />;
    }

    return <CarouselComponent data={data} />;
  };

  useEffect(() => {
      (async () => {
        try {
          await getResponse(
            city, country, isInvalidCity, invalidCountry, isInvalidCountry,
            setError, isInvalidMasonryViewMode, isInvalidCarouselViewMode, setPhotosInState
          );
        } catch (e) {
          !e.response ? setError(requestIsBlocked)
            : setError(e.response.data.message);
        }
      })();
    }, [city, country, setPhotosInState, setError, isInvalidCity,
    isInvalidCountry, isInvalidMasonryViewMode, isInvalidCarouselViewMode,
    invalidCity, invalidCountry]
  );

  if (data.length === 0) {
    return <ErrorMessage errorMessage={error} />;
  }

  return renderImages();
};
