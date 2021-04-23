import {FC} from 'react';
import {Button} from '../button';
import {PropsType} from './typings';
import style from './CarouselComponent.module.css';
import {Carousel} from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';

export const CarouselComponent: FC<PropsType> = ({
  data,
  count,
  showNextResponsePortion,
}) => {

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
