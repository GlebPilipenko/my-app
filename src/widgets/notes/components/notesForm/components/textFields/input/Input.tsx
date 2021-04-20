import {FC, useContext} from 'react';
import cn from 'classnames';
import {PropsType} from './typings';
import style from '../styles/textFields.module.css';
import {Context} from 'src/widgets/notes/components/notesForm/context';

export const Input: FC<PropsType> = ({
  value,
  onChange,
  fieldName,
  valueLength,
  isValidValue,
}) => {
  const {isValidTxtFieldValue} = useContext(Context);
  const isValid = isValidValue && !isValidTxtFieldValue;

  return (
    <>
      <h4>{fieldName}</h4>
      <input
        type='text'
        value={value}
        onChange={onChange}
        className={cn(style.textField, {
          [style.error__textField]: !isValid && valueLength !== 0,
        })}
      />
    </>
  );
};
