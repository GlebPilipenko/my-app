import {getLowerCaseString} from 'src/utils';
import {carousel, masonry} from '../constants';
import {DefaultQueryParameters} from 'src/enums';

export const getHelperConstants = (
  city: string,
  country: string,
  propsMasonry: string,
  propsCarousel: string,
) => {
  const isValidMasonryViewMode = (propsMasonry === getLowerCaseString(masonry));
  const isValidCarouselViewMode = (propsCarousel === getLowerCaseString(carousel));

  const invalidCity = DefaultQueryParameters.InvalidCity;
  const invalidCountry = DefaultQueryParameters.InvalidCountry;
  const invalidMasonryViewMode = DefaultQueryParameters.InvalidMasonryViewMode;
  const invalidCarouselViewMode = DefaultQueryParameters.InvalidCarouselViewMode;

  const isInvalidCity = (city === invalidCity);
  const isInvalidCountry = (country === invalidCountry);
  const isInvalidMasonryViewMode = (propsMasonry === invalidMasonryViewMode);
  const isInvalidCarouselViewMode = (propsCarousel === invalidCarouselViewMode);

  return {
    invalidCity, isInvalidCity, invalidCountry, isInvalidCountry,
    isValidMasonryViewMode, isValidCarouselViewMode, isInvalidMasonryViewMode,
    isInvalidCarouselViewMode
  };
};
