import {FC} from 'react';
import {PropsType} from './typings';
import style from './Masonry.module.css';
import {HitsType} from 'src/api/imagesApi/typings';

export const Masonry: FC<PropsType> = ({data, numberOfColumns}) => {
  const arrayOfImagePaths = data.map((obj: HitsType) => `${obj.webformatURL}`);

  return (
    <div>
      <div
        style={{columnCount: (+numberOfColumns)}}
        className={style.image_grid}
      >
        {arrayOfImagePaths.map((path: string) => {
          const key = `${path}${Date.now()}`;

          return (
            <div key={key} className={style.image_item}>
              <img src={path} alt="images" />
            </div>
          );
        })}
      </div>
    </div>
  );
};
