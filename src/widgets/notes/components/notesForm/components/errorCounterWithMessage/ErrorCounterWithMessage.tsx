import {FC} from 'react';
import {PropsType} from './typings';
import style from './ErrorCounter.module.css';

export const ErrorCounterWithMessage: FC<PropsType> = ({
  count,
  maxLength,
  errorMessage,
  minInputValueLength,
}) => {
  const propsCount = !count ? 0 : count;
  const error = (
    (propsCount !== 0) &&
    ((propsCount > maxLength) ||
      (propsCount < minInputValueLength))
  );
  const countStyle = error
    ? `${style.error__count}`
    : `${style.no_error__count}`;
  const messageStyle = error
    ? `${style.error__message}`
    : `${style.no_error__message}`;

  return (
    <div className={style.container}>
      <span className={countStyle}>
        {`${propsCount} / ${maxLength}`}
      </span>
      <span className={messageStyle}>{error && errorMessage}</span>
    </div>
  );
};
