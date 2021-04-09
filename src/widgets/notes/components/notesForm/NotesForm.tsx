import {FC} from 'react';
import {PropsType} from './typings';
import style from './NotesForm.module.css';

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
  const noteID = `${title}${Math.random()}`;

  const renderForm = () => {
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
            className={style.input}
            onChange={changeInputValue}
          />
        </div>
        {!city && (
          <div className={style.input__container}>
            <h4>Add your city</h4>
            <input
              type="text"
              value={cityTitle}
              className={style.input}
              onChange={changeInputCityValue}
            />
          </div>
        )}
        <div className={style.textarea__container}>
          <h4>Add your description</h4>
          <textarea
            value={description}
            onChange={changeTxtAreaValue}
            className={style.textarea}
          ></textarea>
        </div>
        <button
          className={`${style.btn} ${style.btn__save}`}
          onClick={() => addNotes(noteID)}>
          Save
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

  return renderForm();
};
