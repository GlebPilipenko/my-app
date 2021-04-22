import {getLowerCaseString} from 'src/utils';
import {carousel, masonry} from '../constants';
import {DefaultPropsParameters, DefaultQueryParameters} from 'src/enums';

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
  const invalidMasonryViewMode = DefaultPropsParameters.InvalidMasonryViewMode;
  const invalidCarouselViewMode = DefaultPropsParameters.InvalidCarouselViewMode;

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
