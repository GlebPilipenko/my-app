import {FC} from 'react';
import cn from 'classnames';
import {PropsType} from './typings';
import style from './NotesForm.module.css';
import {Context, valueIsValid} from './context';
import {Input} from './components/textFields/input';
import {TextArea} from './components/textFields/textArea';
import {FieldValidation} from './components/fieldValidation';
import {getErrorMessage, getNoteID, isValidTxtFields} from './utils';
import {
  save,
  createNote,
  maxTitleLength,
  maxCityTitleLength,
  maxDescriptionLength,
} from './constants';

export const NotesForm: FC<PropsType> = ({
  city,
  title,
  addNotes,
  showForm,
  cityTitle,
  description,
  changeInputValue,
  changeTxtAreaValue,
  changeInputCityValue,
  changeVisibilityForm,
}) => {
  const noteID = getNoteID(title);

  const titleLength = title.length;
  const descriptionLength = description.length;
  const getCityTitleLength = () => cityTitle.length;
  const cityTitleLength = city ? city.length : getCityTitleLength();

  const {isValidTitleValue, isValidCityTitleValue, isValidDescriptionValue
  } = isValidTxtFields(titleLength, cityTitleLength, descriptionLength);

  const isDisabled =
    isValidTitleValue && isValidCityTitleValue && isValidDescriptionValue;

  const renderNotesForm = () => (
    <Context.Provider value={valueIsValid}>
      <div className={style.form__container}>
        <div className={style.btn__container}>
          <button
            className={style.btn}
            onClick={changeVisibilityForm}
          >
            {createNote}
          </button>
        </div>
        <FieldValidation
          valueLength={titleLength}
          maxValueLength={maxTitleLength}
          errorMessage={`${getErrorMessage(maxTitleLength)}`}
        >
          <Input
            value={title}
            fieldName={`Title`}
            valueLength={titleLength}
            onChange={changeInputValue}
            maxValueLength={maxTitleLength}
            isValidValue={isValidTitleValue}
          />
        </FieldValidation>
        {!city && (
          <FieldValidation
            valueLength={getCityTitleLength()}
            maxValueLength={maxCityTitleLength}
            errorMessage={`${getErrorMessage(maxCityTitleLength)}`}
          >
            <Input
              value={cityTitle}
              fieldName={`City`}
              onChange={changeInputCityValue}
              valueLength={getCityTitleLength()}
              maxValueLength={maxCityTitleLength}
              isValidValue={isValidCityTitleValue}
            />
          </FieldValidation>
        )}
        <FieldValidation
          valueLength={descriptionLength}
          maxValueLength={maxDescriptionLength}
          errorMessage={`${getErrorMessage(maxDescriptionLength)}`}
        >
          <TextArea
            value={description}
            fieldName={`Description`}
            onChange={changeTxtAreaValue}
            valueLength={descriptionLength}
            isValidValue={isValidDescriptionValue}
          />
        </FieldValidation>
        <button
          disabled={!isDisabled}
          onClick={() => addNotes(noteID)}
          className={cn({
            [`${style.btn_save} ${style.btn_save__error}`]: !isDisabled,
            [`${style.btn_save} ${style.btn_save__no_error}`]: isDisabled,
          })}
        >
          {save}
        </button>
      </div>
    </Context.Provider>
  );

  if (!showForm) {
    return (
      <div className={style.btn__container}>
        <button
          className={style.btn}
          onClick={changeVisibilityForm}
        >
          {createNote}
        </button>
      </div>
    );
  }

  return renderNotesForm();
};
