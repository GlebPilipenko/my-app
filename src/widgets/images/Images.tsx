import {FC, useCallback, useEffect, useState} from 'react';
import {PropsType} from './typings';
import {HitsType} from 'src/api/imagesApi/typings';
import {ErrorMessage} from 'src/common/errorMessage';
import {useCountValue, useErrorValue} from 'src/hooks';
import {Masonry, CarouselComponent} from './components';
import {getResponse, getHelperConstants} from './utils';
import {errorMessage, requestIsBlocked} from 'src/constants';
import {DefaultPropsParameters, DefaultQueryParameters} from 'src/enums';
import {getNextResponsePortion} from './components/utils/getNextResponsePortion';

export const Images: FC<PropsType> = ({
  city = DefaultQueryParameters.InvalidCity,
  country = DefaultQueryParameters.InvalidCountry,
  page = DefaultPropsParameters.DefaultCountPage,
  portion = DefaultPropsParameters.DefaultPortionOfPage,
  column: columnCount = DefaultPropsParameters.DefaultColumnCount,
  masonry: propsMasonry = DefaultPropsParameters.InvalidMasonryViewMode,
  carousel: propsCarousel = DefaultPropsParameters.InvalidCarouselViewMode,
}) => {
  const [count, setCount] = useCountValue(1);
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
  const showNextResponsePortion = () => {
    setCount(count + 1);

    return getNextResponsePortion(
      city, country, data, page, portion, count, setError, setData
    )
  };
  const renderImages = () => {
    if (isValidMasonryViewMode) {
      return (
        <Masonry
          data={data}
          numberOfColumns={columnCount}
          showNextResponsePortion={showNextResponsePortion}
        />
      );
    }

    if (isValidCarouselViewMode) {
      return (
        <CarouselComponent
          data={data}
          count={count}
          portion={portion}
          showNextResponsePortion={showNextResponsePortion}
        />
      );
    }

    return (
      <CarouselComponent
        data={data}
        count={count}
        portion={portion}
        showNextResponsePortion={showNextResponsePortion}
      />
    );
  };

  useEffect(() => {
    (async () => {
      try {
        await getResponse(
          city, country, portion, isInvalidCity, invalidCountry,
          isInvalidCountry, setError, isInvalidMasonryViewMode,
          isInvalidCarouselViewMode, setPhotosInState
        );
      } catch (e) {
        !e.response ? setError(requestIsBlocked)
          : setError(e.response.data.message);
      }
      })();
    }, [city, country, portion, setPhotosInState, setError, isInvalidCity,
    isInvalidCountry, isInvalidMasonryViewMode, isInvalidCarouselViewMode,
    invalidCity, invalidCountry]
  );

  if (data.length === 0) {
    return <ErrorMessage errorMessage={error} />;
  }

  return renderImages();
};
