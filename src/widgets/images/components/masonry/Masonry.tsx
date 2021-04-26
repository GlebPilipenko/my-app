import {FC} from 'react';
import {Button} from '../button';
import {PropsType} from './typings';
import style from './Masonry.module.css';
import {DefaultPropsParameters} from 'src/enums';
import {HitsType} from 'src/api/imagesApi/typings';

export const Masonry: FC<PropsType> = ({
  data,
  showNextResponsePortion,
  numberOfColumns = DefaultPropsParameters.DefaultColumnCount,
}) => {
  const getArrayOfImagePaths = () => data.map((obj: HitsType) => `${obj.webformatURL}`);

  return (
    <>
      <div
        style={{columnCount: (+numberOfColumns)}}
        className={style.image_grid}
      >
        {getArrayOfImagePaths().map((path: string) => {
          const key = `${path}${Date.now()}`;

          return (
            <div key={key} className={style.image_item}>
              <img src={path} alt="images" />
            </div>
          );
        })}
      </div>
      <Button showNextResponsePortion={showNextResponsePortion} />
    </>
  );
};
