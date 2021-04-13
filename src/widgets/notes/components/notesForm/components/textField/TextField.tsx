import {FC, useEffect} from 'react';
import {PropsType} from './typings';
import style from './TextField.module.css';

export const TextField: FC<PropsType> = ({
  title,
  count,
  fieldName,
  maxLength,
  fieldStyle,
  countStyle,
  changeValue,
  setMaxLength,
  messageStyle,
  errorMessage,
  showTextArea,
  setPropsCount,
  textFieldError,
}) => {
  const propsCount = count || 0;

  const rendEntryField = () => {
    if (showTextArea) {
      return <textarea
        value={title}
        onChange={changeValue}
        className={fieldStyle}
      />;
    }

    return <input
      type='text'
      value={title}
      onChange={changeValue}
      className={fieldStyle}
    />;
  };

  useEffect(() => {
    setPropsCount(propsCount);
    setMaxLength(maxLength);
  }, [propsCount, maxLength]);

  return (
    <div className={style.input__container}>
      <h4>{fieldName}</h4>
      {rendEntryField()}
      <div className={style.container}>
        <span className={countStyle}>
          {`${propsCount} / ${maxLength}`}
        </span>
        <span className={messageStyle}>
          {textFieldError && errorMessage}
        </span>
      </div>
    </div>
  );
};
