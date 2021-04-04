import {FC} from 'react';
import {PropsType} from './typings';
import style from './ErrorCounter.module.css';

export const ErrorCounter: FC<PropsType> = ({
  count,
  maxLength,
  errorMessage,
  minInputValueLength,
}) => {
  const propsCount = !count ? 0 : count;
  const errorStyle = (
    (propsCount !== 0) &&
    ((propsCount > maxLength) ||
    (propsCount < minInputValueLength))
  );
  const textCountStyle = errorStyle ? `${style.red}` : ``;

  debugger
  return (
    <div>
      <span className={textCountStyle}>
        {`${propsCount} / ${maxLength}`}
        {errorStyle && errorMessage}
      </span>
    </div>
  );
};
