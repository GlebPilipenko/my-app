import {FC} from 'react';
import cn from 'classnames';
import {isValid} from './utils';
import {PropsType} from './typings';
import style from './FieldValidation.module.css';

export const FieldValidation: FC<PropsType> = ({
  children,
  valueLength,
  errorMessage,
  maxValueLength,
}) => {
  const dataIsValid: boolean = isValid(valueLength, maxValueLength);

  return (
    <label className={style.text_field__container}>
      {children}
      <div className={style.container}>
         <span className={cn(style.count, {
           [style.no_error__count]: dataIsValid,
           [style.error__count]: !dataIsValid && valueLength !== 0,
         })}>
           {`${valueLength} / ${maxValueLength}`}
         </span>
        <span className={
          cn({
            [style.no_error__message]: dataIsValid,
            [style.error__message]: !dataIsValid
          })}
        >
          {
            (valueLength === 0)
            ? null
            : !dataIsValid && errorMessage
          }
        </span>
      </div>
    </label>
  );
};
