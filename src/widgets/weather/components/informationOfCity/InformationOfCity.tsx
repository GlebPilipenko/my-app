import {FC} from 'react';
import {PropsType} from './typings';
import {getCapitalizedString} from 'src/utils';
import style from './InformationOfCity.module.css';
import {WeatherType} from 'src/api/weatherApi/typings';
import {getFormattedDate} from 'src/utils/getFormattedDate';

export const InformationOfCity: FC<PropsType> = ({state}) => {
  const url = process.env.REACT_APP_WEATHER_IMG_URL_CITY;
  const noonTime = '12:00:00';

  if (!state) {
    return null;
  }

  return (
    <div className={style.information__wrapper}>
      <div className={style.info__container}>
        {state.list.map(({dt, dt_txt, weather, main}) => {
          const index = `${dt}_${Math.random()}`;
          const time = dt_txt.split(' ')[1];

          if (time !== noonTime) {
            return null;
          }

          const description = getCapitalizedString(weather[0].description);
          const temperature = `${Math.floor(main.feels_like)}°`;
          const iconQuery = weather.map((obj: WeatherType) => {
            return `${obj.icon}.png`;
          });

          return (
            <div
              key={index}
              className={style.info__wrapper}
            >
              <div className={style.info__block}>
                <div className={style.info__block_top}>
                  {state.city.name}
                  <br />
                  {getFormattedDate(dt)}
                </div>
                <div className={style.info__block_middle}>
                  <img
                    alt='weather'
                    src={`${url}${iconQuery}`}
                  />
                  <span>{temperature}</span>
                </div>
                <div className={style.info__block_bottom}>
                  {description}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
