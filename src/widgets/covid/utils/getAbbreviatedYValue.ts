import {ArrayLength} from '../enum';

// Функция getAbbreviatedYValue принимет index, maxYValue - (максимальное
// значение, кол-во заболевших ковидом в конкретной стране), numYTicks - это
// кол-во (отображаемых значений слева по оси Y)

export const getAbbreviatedYValue = (
  index: number, maxYValue: number, numYTicks: number
) => {

  // Переменная valueOnAxisY работает следующим образом: maxYvalue /
  // numYTicks, после * на index (1ый === 0), далее от maxYValue отнимается
  // значение.
  // country === Russia.
  // maxYValue = 4545095
  // index = 0
  // numYTicks = 10

  // 1ое значен 4545095 - 0 * (4545095 / 10) = 4545095
  // 2ое значен 4545095 - 1 * (4545095 / 10) = 4090568
  // 3е значен 4545095 - 2 * (4545095 / 10) = 3636077
  // 4е значен 4545095 - 3 * (4545095 / 10) = 3181568
  // ...
  // А далее функция getTruncatedValue ретурнит обрезанное значение.
  const valueOnAxisY = (maxYValue - index * (maxYValue / numYTicks)).toFixed(0);
  const arrayOfTruncatedValue = valueOnAxisY.slice(0, 3).split('');

  return getTruncatedValue(arrayOfTruncatedValue, valueOnAxisY.length);
};

const getTruncatedValue = (arrayOfTruncatedValue: string[], valueOnAxisY: number) => {
  switch (valueOnAxisY) {
    case ArrayLength.Eight:
      return `${arrayOfTruncatedValue[0]}${arrayOfTruncatedValue[1]}.${
        arrayOfTruncatedValue[2]} M`;
    case ArrayLength.Seven:
      return `${arrayOfTruncatedValue[0]}.${arrayOfTruncatedValue[1]} M`;
    case ArrayLength.Six:
      return `0.${arrayOfTruncatedValue[0]}${arrayOfTruncatedValue[1]} M`;
    case ArrayLength.Five:
      return `0.0${arrayOfTruncatedValue[0]} M`;
    case ArrayLength.Four:
      return `0.00${arrayOfTruncatedValue[0]} M`;
    default:
      return arrayOfTruncatedValue;
  }
};
