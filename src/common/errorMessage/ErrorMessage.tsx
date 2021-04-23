import {FC} from 'react';
import {PropsType} from './typings';
import style from './ErrorMessage.module.css';

export const ErrorMessage: FC<PropsType> = ({errorMessage}) => (
  <div className={style.error__container}>
    <div className={style.error__block}>
      {errorMessage}
    </div>
  </div>
);
