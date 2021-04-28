import {
  minLength,
  maxTitleLength,
  maxCityTitleLength,
  maxDescriptionLength
} from '../constants';

export const getHelperConstants = (
  city: string = '', title: string, cityTitle: string, description: string
) => {
  const titleLength = title.length;
  const descriptionLength = description.length;
  const getCityTitleLength = () => cityTitle.length;
  const cityTitleLength = city ? city.length : getCityTitleLength();

  const isValidTitleValue =
    (titleLength >= minLength) && (titleLength <= maxTitleLength);
  const isValidCityTitleValue =
    (cityTitleLength >= minLength) && (cityTitleLength <= maxCityTitleLength);
  const isValidDescriptionValue =
    (descriptionLength >= minLength) && (descriptionLength <= maxDescriptionLength);
  const isDisabled =
    isValidTitleValue && isValidCityTitleValue && isValidDescriptionValue;

  return {
    isDisabled, titleLength, descriptionLength, isValidTitleValue,
    getCityTitleLength, isValidCityTitleValue, isValidDescriptionValue
  };
};
