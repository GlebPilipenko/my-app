import cn from 'classnames';
import style from '../TextField.module.css';

export const getValidationStyles = (
  propsCount: number, maxLength: number, minInputValueLength: number
) => {
  const error = (
    (propsCount !== 0) &&
    (
      (propsCount > maxLength) ||
      (propsCount < minInputValueLength)
    )
  );

  const countStyle = cn({
    [style.error__count]: error,
    [style.no_error__count]: !error,
  });
  const messageStyle = cn({
    [style.error__message]: error,
    [style.no_error__message]: !error,
  });

  return {error, countStyle, messageStyle};
};
