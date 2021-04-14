import {FC, useState} from 'react';
import {PropsType} from './typings';
import style from './NotesForm.module.css';
import {TextField} from './components/textField';
import {getNoteID, getErrorMessage, getValidationStyles} from './utils';
import {
  save,
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
  titleCount,
  description,
  cityTitleCount,
  descriptionCount,
  changeInputValue,
  changeTxtAreaValue,
  changeInputCityValue,
  changeVisibilityForm,
}) => {
  const [showTextArea] = useState<boolean>(false);

  const noteID = getNoteID(title);

  const titleLength = title.length;
  const cityTitleLength = cityTitle.length;
  const descriptionLength = description.length;

  const {
    error,
    titleStyle,
    errorBtnStyle,
    cityTitleStyle,
    descriptionStyle,
  } = getValidationStyles(titleLength, cityTitleLength, descriptionLength);

  const renderNotesForm = () => {
    return (
      <div className={style.form__container}>
        <div className={style.btn__container}>
          <button
            className={style.btn}
            onClick={changeVisibilityForm}>
            Create note
          </button>
        </div>
        <TextField
          title={title}
          count={titleCount}
          fieldName={`Title`}
          fieldStyle={titleStyle}
          maxLength={maxTitleLength}
          showTextArea={showTextArea}
          changeValue={changeInputValue}
          errorMessage={getErrorMessage(maxTitleLength)}
        />
        {!city && (
          <TextField
            title={cityTitle}
            count={cityTitleCount}
            fieldName={`City title`}
            fieldStyle={cityTitleStyle}
            showTextArea={showTextArea}
            maxLength={maxCityTitleLength}
            changeValue={changeInputCityValue}
            errorMessage={getErrorMessage(maxCityTitleLength)}
          />
        )}
        <TextField
          title={description}
          showTextArea={true}
          count={descriptionCount}
          fieldStyle={descriptionStyle}
          maxLength={maxDescriptionLength}
          changeValue={changeTxtAreaValue}
          fieldName={`Add your description`}
          errorMessage={getErrorMessage(maxDescriptionLength)}
        />
        <button
          disabled={error}
          className={errorBtnStyle}
          onClick={() => addNotes(noteID)}
        >
          {save}
        </button>
      </div>
    );
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

  return renderNotesForm();
};
