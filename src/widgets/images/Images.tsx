import {FC, useCallback, useEffect, useState} from 'react';
import {PropsType} from './typings';
import {useErrorValue} from 'src/hooks';
import {HitsType} from 'src/api/imagesApi/typings';
import {ErrorMessage} from 'src/common/errorMessage';
import {Masonry, CarouselComponent} from './components';
import {getResponse, getHelperConstants} from './utils';
import {errorMessage, requestIsBlocked} from 'src/constants';
import {DefaultPropsParameters, DefaultQueryParameters} from 'src/enums';

export const Images: FC<PropsType> = ({
  city = DefaultQueryParameters.InvalidCity,
  country = DefaultQueryParameters.InvalidCountry,
  page = DefaultPropsParameters.DefaultCountPage,
  portion = DefaultPropsParameters.DefaultPortionOfPage,
  column: columnCount = DefaultPropsParameters.DefaultColumnCount,
  masonry: propsMasonry = DefaultPropsParameters.InvalidMasonryViewMode,
  carousel: propsCarousel = DefaultPropsParameters.InvalidCarouselViewMode,
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
      return (
        <Masonry
          city={city}
          page={page}
          data={data}
          country={country}
          portion={portion}
          setData={setData}
          setError={setError}
          numberOfColumns={columnCount}
        />
      );
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
