import {FC} from 'react';
import {PropsType} from './typings';
import style from './NotesForm.module.css';
import {ErrorCounterWithMessage} from './components/errorCounterWithMessage';

export const NotesForm: FC<PropsType> = ({
  city,
  title,
  addNotes,
  showForm,
  cityTitle,
  titleCount,
  description,
  cityTitleCount,
  descriptionCount,
  changeInputValue,
  changeTxtAreaValue,
  changeInputCityValue,
  changeVisibilityForm,
}) => {
  const save = `Save`;
  const invalidForm = `Invalid Form`;
  const noteID = `${title}${Math.random()}`;
  const errorMessage = (maxLength: number) => (
    `Value must be between 3 and ${maxLength} inclusive...`
  );

  const minInputValueLength = 3;
  const maxDescriptionLength = 250;
  const maxTitleLength = 100;
  const maxCityTitleLength = 100;

  const titleLength = title.length;
  const cityTitleLength = cityTitle.length;
  const descriptionLength = description.length;

  const errorTitle = (
    (titleLength < minInputValueLength) ||
    (titleLength > maxTitleLength)
  );
  const errorCityTitle = (
    (cityTitleLength < minInputValueLength) ||
    (cityTitleLength > maxCityTitleLength)
  );
  const errorDescription = (
    (descriptionLength < minInputValueLength) ||
    (descriptionLength > maxDescriptionLength)
  );
  const error = errorTitle || errorCityTitle || errorDescription;

  const titleStyle = errorTitle && titleLength !== 0 ? style.error : style.input;
  const cityTitleStyle = errorCityTitle && cityTitleLength !== 0
    ? style.error
    : style.input;
  const descriptionStyle = errorDescription && descriptionLength !== 0
    ? style.error
    : style.textarea;
  const errorBtnStyle = error
    ? `${style.btn__error} ${style.invalid_btn__error}`
    : `${style.btn__error} ${style.btn__save}`;

  const renderErrorCounterWithMessage = (count: number, errorMessage: string,
    maxLength: number, minInputValueLength: number) => {
    return <ErrorCounterWithMessage
      count={count}
      errorMessage={errorMessage}
      maxLength={maxLength}
      minInputValueLength={minInputValueLength}
    />;
  };

  if (!showForm) {
    return (
      <div className={style.btn__container}>
        <button
          className={style.btn}
          onClick={changeVisibilityForm}>
          Create note
        </button>
      </div>
    );
  }

  return (
    <div className={style.form__container}>
      <div className={style.btn__container}>
        <button
          className={style.btn}
          onClick={changeVisibilityForm}>
          Create note
        </button>
      </div>
      <div className={style.input__container}>
        <h4>Add your title</h4>
        <input
          type="text"
          value={title}
          onChange={changeInputValue}
          className={titleStyle}
        />
        {
          renderErrorCounterWithMessage(
            titleCount, errorMessage(maxTitleLength), maxCityTitleLength, minInputValueLength
          )
        }
      </div>
      {!city && (
        <div className={style.input__container}>
          <h4>Add your city</h4>
          <input
            type="text"
            value={cityTitle}
            onChange={changeInputCityValue}
            className={cityTitleStyle}
          />
          {
            renderErrorCounterWithMessage(cityTitleCount,
              errorMessage(maxCityTitleLength), maxCityTitleLength, minInputValueLength
            )
          }
        </div>
      )}
      <div className={style.textarea__container}>
        <h4>Add your description</h4>
        <textarea
          value={description}
          onChange={changeTxtAreaValue}
          className={descriptionStyle}
        ></textarea>
        {
          renderErrorCounterWithMessage(descriptionCount,
            errorMessage(maxDescriptionLength), maxDescriptionLength, minInputValueLength
          )
        }
      </div>
      <button
        disabled={error}
        onClick={() => addNotes(noteID)}
        className={errorBtnStyle}
      >
        {error ? invalidForm : save}
      </button>
    </div>
  );
};
