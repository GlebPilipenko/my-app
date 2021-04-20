import {
  minLength,
  maxTitleLength,
  maxCityTitleLength,
  maxDescriptionLength
} from '../constants';

export const isValidTxtFields = (
  titleLength: number, cityTitleLength: number, descriptionLength: number
) => {
  const isValidTitleValue =
    (titleLength >= minLength) && (titleLength <= maxTitleLength);
  const isValidCityTitleValue =
    (cityTitleLength >= minLength) && (cityTitleLength <= maxCityTitleLength);
  const isValidDescriptionValue =
    (descriptionLength >= minLength) && (descriptionLength <= maxDescriptionLength);

  return {isValidTitleValue, isValidCityTitleValue, isValidDescriptionValue};
};
