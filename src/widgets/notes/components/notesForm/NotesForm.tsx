import {FC, useState} from 'react';
import {PropsType} from './typings';
import style from './NotesForm.module.css';
import {TextField} from './components/textField'
import {getErrorMessage, getNoteID} from './utils';
import {getValidationStyles} from './utils/getValidationStyles';
import {
  save,
  minLength,
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
    error, titleStyle, cityTitleStyle,
    descriptionStyle, errorBtnStyle
  } = getValidationStyles(
    titleLength, cityTitleLength, descriptionLength
  );

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
          fieldName={`Title`}
          count={titleCount}
          minLength={minLength}
          maxLength={maxTitleLength}
          fieldStyle={titleStyle}
          showTextArea={showTextArea}
          changeValue={changeInputValue}
          errorMessage={getErrorMessage(maxTitleLength)}
        />
        {!city && (
          <TextField
            title={cityTitle}
            fieldName={`City title`}
            count={cityTitleCount}
            minLength={minLength}
            maxLength={maxCityTitleLength}
            fieldStyle={cityTitleStyle}
            showTextArea={showTextArea}
            changeValue={changeInputCityValue}
            errorMessage={getErrorMessage(maxCityTitleLength)}
          />
        )}
        <TextField
          title={description}
          fieldName={`Add your description`}
          count={descriptionCount}
          minLength={minLength}
          maxLength={maxDescriptionLength}
          showTextArea={true}
          fieldStyle={descriptionStyle}
          changeValue={changeTxtAreaValue}
          errorMessage={getErrorMessage(maxDescriptionLength)}
        />
        <button
          disabled={error}
          onClick={() => addNotes(noteID)}
          className={errorBtnStyle}
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
