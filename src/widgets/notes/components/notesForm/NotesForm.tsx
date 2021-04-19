import {FC} from 'react';
import cn from 'classnames';
import {PropsType} from './typings';
import style from './NotesForm.module.css';
import {Input} from './components/textFields/input';
import {TextArea} from './components/textFields/textArea';
import {FieldValidation} from './components/fieldValidation';
import {getErrorMessage, getNoteID, isDisabledButton} from './utils';
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
  const noDisabledButton = isDisabledButton(
    titleLength, cityTitleLength, descriptionLength
  );

  const renderNotesForm = () => (
    <div className={style.form__container}>
      <div className={style.btn__container}>
        <button
          className={style.btn}
          onClick={changeVisibilityForm}>
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
            valueLength={getCityTitleLength()}
            onChange={changeInputCityValue}
            maxValueLength={maxCityTitleLength}
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
          maxValueLength={maxDescriptionLength}
        />
      </FieldValidation>
        <button
          disabled={!noDisabledButton}
          onClick={() => addNotes(noteID)}
          className={cn({
            [`${style.btn_save} ${style.btn_save__error}`]: !noDisabledButton,
            [`${style.btn_save} ${style.btn_save__no_error}`]: noDisabledButton,
          })}
        >
          {save}
        </button>
    </div>
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
