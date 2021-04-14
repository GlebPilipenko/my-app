import cn from 'classnames';
import style from '../NotesForm.module.css';
import {
  minLength,
  maxTitleLength,
  maxCityTitleLength,
  maxDescriptionLength,
} from '../constants';

export const getValidationStyles = (
  titleLength: number, cityTitleLength: number, descriptionLength: number
) => {
  const errorTitle = (
    (titleLength < minLength) ||
    (titleLength > maxTitleLength)
  );
  const errorCityTitle = (
    (cityTitleLength < minLength) ||
    (cityTitleLength > maxCityTitleLength)
  );
  const errorDescription = (
    (descriptionLength < minLength) ||
    (descriptionLength > maxDescriptionLength)
  );

  const error = errorTitle || errorCityTitle || errorDescription;

  const titleStyle = cn(style.input, {
    [style.error]: errorTitle && titleLength !== 0,
  });
  const cityTitleStyle = cn(style.input, {
    [style.error]: errorCityTitle && cityTitleLength !== 0,
  });
  const descriptionStyle = cn(style.input, {
    [style.error]: errorDescription && descriptionLength !== 0,
  });
  const errorBtnStyle = cn({
    [`${style.btn__error} ${style.invalid_btn__error}`]: error,
    [`${style.btn__error} ${style.btn__save}`]: !error,
  });

  return {error, titleStyle, cityTitleStyle, descriptionStyle, errorBtnStyle};
};
