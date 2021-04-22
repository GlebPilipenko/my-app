import {FC, useEffect} from 'react';
import {Button} from '../button';
import {PropsType} from '../typings';
import {useCountValue} from 'src/hooks';
import style from './Masonry.module.css';
import {HitsType} from 'src/api/imagesApi/typings';
import {getNextResponsePortion} from '../utils/getNextResponsePortion';
import {DefaultPropsParameters} from '../../../../enums';

export const Masonry: FC<PropsType> = ({
  city,
  page,
  data,
  country,
  setData,
  portion,
  setError,
  numberOfColumns = DefaultPropsParameters.DefaultColumnCount,
}) => {
  const [count, setCount] = useCountValue(0);

  const getArrayOfImagePaths = () => data.map((obj: HitsType) => `${obj.webformatURL}`);
  const showNextResponsePortion = () => getNextResponsePortion(
    city, country, data, page, portion, count, setError, setData
  );

  useEffect(() => {
    setCount(count + 1);
  }, [data]);

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
