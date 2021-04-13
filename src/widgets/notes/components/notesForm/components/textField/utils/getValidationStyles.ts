import style from '../TextField.module.css';

export const getValidationStyles = (
  propsCount: number, maxLength: number, minInputValueLength: number
) => {
  const error = (
    (propsCount !== 0) &&
    ((propsCount > maxLength) ||
      (propsCount < minInputValueLength)));

  const countStyle = error
    ? `${style.error__count}`
    : `${style.no_error__count}`;
  const messageStyle = error
    ? `${style.error__message}`
    : `${style.no_error__message}`;

  return {error, countStyle, messageStyle};
};
