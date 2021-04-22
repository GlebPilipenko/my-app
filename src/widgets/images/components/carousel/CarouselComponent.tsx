import {FC, useEffect} from 'react';
import {Button} from '../button';
import {PropsType} from '../typings';
import {useCountValue} from 'src/hooks';
import style from './CarouselComponent.module.css';
import {Carousel} from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import {getNextResponsePortion} from '../utils/getNextResponsePortion';

export const CarouselComponent: FC<PropsType> = ({
  city,
  data,
  page,
  country,
  portion,
  setData,
  setError,
}) => {
  const [count, setCount] = useCountValue(0);

  const showNextResponsePortion = () => getNextResponsePortion(
    city, country, data, page, portion, count, setError, setData
  );

  useEffect(() => {
    setCount(count + 1);
  }, [data]);

  return (
    <>
      <Carousel
        showThumbs={false}
        showStatus={false}
        infiniteLoop={true}
        dynamicHeight={true}
        showIndicators={count < 4}
      >
        {data.map(({webformatURL: webFormatURL}) => {
          const key = `${webFormatURL}${Date.now()}`;

          return (
            <div key={key} className={style.container}>
              <img src={webFormatURL} alt="images" />
            </div>
          );
        })}
      </Carousel>
      <Button showNextResponsePortion={showNextResponsePortion} />
    </>
  );
};
