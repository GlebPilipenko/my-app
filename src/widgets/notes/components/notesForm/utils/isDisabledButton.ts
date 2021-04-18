import {
  minLength,
  maxTitleLength,
  maxCityTitleLength,
  maxDescriptionLength
} from '../constants';

export const isDisabledButton = (
  titleLength: number, cityTitleLength: number, descriptionLength: number
) => (
  (titleLength >= minLength) && (titleLength <= maxTitleLength) &&
  (cityTitleLength >= minLength) && (cityTitleLength <= maxCityTitleLength) &&
  (descriptionLength >= minLength) && (descriptionLength <= maxDescriptionLength)
);
