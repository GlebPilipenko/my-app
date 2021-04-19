import {FC, useEffect, useState} from 'react';
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

  const [state, setState] = useState<any>({
    tl: null,
    ctl: null,
    dtl: null
  });

  console.log(state);

  const titleLength = title.length;
  const cityTitleLength = cityTitle.length;
  const descriptionLength = description.length;

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
        setState={setState}
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
          setState={setState}
          valueLength={cityTitleLength}
          maxValueLength={maxCityTitleLength}
          errorMessage={`${getErrorMessage(maxCityTitleLength)}`}
        >
          <Input
            value={cityTitle}
            fieldName={`City`}
            valueLength={cityTitleLength}
            onChange={changeInputCityValue}
            maxValueLength={maxCityTitleLength}
          />
        </FieldValidation>
      )}
      <FieldValidation
        setState={setState}
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
