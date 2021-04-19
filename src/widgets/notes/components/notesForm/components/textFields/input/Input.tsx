import {FC} from 'react';
import cn from 'classnames';
import {PropsType} from './typings';
import style from '../styles/textFields.module.css';
import {isValid} from '../../fieldValidation/utils';

export const Input: FC<PropsType> = ({
  value,
  onChange,
  fieldName,
  valueLength,
  maxValueLength,
}) => {
  const valueIsValid: boolean = isValid(valueLength, maxValueLength);

  return (
    <>
      <h4>{fieldName}</h4>
      <input
        type='text'
        value={value}
        onChange={onChange}
        className={cn(style.textField, {
          [style.error__textField]: !valueIsValid && valueLength !== 0,
        })}
      />
    </>
  );
};
