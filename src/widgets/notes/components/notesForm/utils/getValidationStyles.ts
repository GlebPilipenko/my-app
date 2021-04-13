import cn from 'classnames';
import NotesFormStyle from '../NotesForm.module.css';
import TextFieldStyle from '../components/textField/TextField.module.css';
import {
  minLength,
  maxTitleLength,
  maxCityTitleLength,
  maxDescriptionLength,
} from '../constants';

export const getValidationStyles = (
  propsCount: number,
  maxLength: number,
  titleLength: number,
  cityTitleLength: number,
  descriptionLength: number,
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
  const textFieldError = (
    (propsCount !== 0) &&
    ((propsCount > maxLength) || (propsCount < minLength))
  );
  const notesValueError = errorTitle || errorCityTitle || errorDescription;

  const countStyle = cn(TextFieldStyle.error__count, {
    [`${TextFieldStyle.no_error__count}`]: !textFieldError,
  });
  const messageStyle = cn(TextFieldStyle.error__message, {
    [`${TextFieldStyle.no_error__message}`]: !textFieldError,
  });
  const titleStyle = cn(NotesFormStyle.input, {
    [NotesFormStyle.error]: errorTitle && titleLength !== 0,
  });
  const cityTitleStyle = cn(NotesFormStyle.input, {
    [NotesFormStyle.error]: errorCityTitle && cityTitleLength !== 0,
  });
  const descriptionStyle = cn(NotesFormStyle.input, {
    [NotesFormStyle.error]: errorDescription && descriptionLength !== 0,
  });
  const errorBtnStyle = cn({
    [`${NotesFormStyle.btn__error} ${NotesFormStyle.invalid_btn__error}`]
      : notesValueError,
    [`${NotesFormStyle.btn__error} ${NotesFormStyle.btn__save}`]
      : !notesValueError,
  });

  return {
    titleStyle,
    countStyle,
    messageStyle,
    errorBtnStyle,
    textFieldError,
    cityTitleStyle,
    notesValueError,
    descriptionStyle,
  };
};
