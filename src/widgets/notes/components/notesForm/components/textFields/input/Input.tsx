import {FC} from 'react';
import cn from 'classnames';
import {PropsType} from './typings';
import style from '../styles/textFields.module.css';
import {isValid} from '../../fieldValidation/utils';

export const Input: FC<PropsType> = ({
  value,
  onChange,
  valueLength,
  maxValueLength
}) => {
  const dataIsValid: boolean = isValid(valueLength, maxValueLength);

  return <input
    type='text'
    value={value}
    onChange={onChange}
    className={cn(style.textField, {
      [style.error__textField]: !dataIsValid && valueLength !== 0,
    })}
  />;
};
