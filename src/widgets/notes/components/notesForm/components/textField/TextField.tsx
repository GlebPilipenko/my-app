import {FC} from 'react';
import {PropsType} from './typings';
import style from './TextField.module.css';
import {getValidationStyles} from './utils';

export const TextField: FC<PropsType> = ({
  title,
  count,
  fieldName,
  minLength,
  maxLength,
  fieldStyle,
  changeValue,
  errorMessage,
  showTextArea,
}) => {
  const propsCount = count || 0;

  const {error, countStyle, messageStyle} = getValidationStyles(
    propsCount, maxLength, minLength
  );

  const rendEntryField = () => {
    if (showTextArea) {
      return <textarea
        value={title}
        onChange={changeValue}
        className={fieldStyle}
      />;
    }

    return <input
      type="text"
      value={title}
      onChange={changeValue}
      className={fieldStyle}
    />;
  };

  return (
    <div className={style.input__container}>
      <h4>{fieldName}</h4>
      {rendEntryField()}
      <div className={style.container}>
        <span className={countStyle}>
          {`${propsCount} / ${maxLength}`}
        </span>
        <span className={messageStyle}>
          {error && errorMessage}
        </span>
      </div>
    </div>
  );
};
