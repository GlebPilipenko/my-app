import {FC} from 'react';
import {PropsType} from './typings';
import style from './Button.module.css';

export const Button: FC<PropsType> = ({showNextResponsePortion}) => (
  <div className={style.btn_container}>
    <button
      className={style.btn}
      onClick={showNextResponsePortion}
    >
      Get More
    </button>
  </div>
);
