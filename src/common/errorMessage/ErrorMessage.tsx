import style from './ErrorMessage.module.css';
import {FC} from 'react';
import {PropsType} from './typings';

export const ErrorMessage: FC<PropsType> = ({errorMessage}) => {
  return (
    <div className={style.error__container}>
      <div className={style.error__block}>
        {errorMessage}
      </div>
    </div>
  );
};
