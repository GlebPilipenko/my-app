// import {ArrayLength} from '../enum';

const getArrayOfValues = (maxYValue: number) => {
  let array = [];

  for(let i = 10; i >= 1; i--) {
    array.push((maxYValue * i / 10000000).toFixed(2));
  }

  return array;
};

export const getAbbreviatedYValue = ( index: number, maxYValue: number) => (
  `${getArrayOfValues(maxYValue)[index]} M`
);


// export const getAbbreviatedYValue = (
//   index: number, maxYValue: number, numYTicks: number
// ) => {
//   const valueOnAxisY = (maxYValue - index * (maxYValue / numYTicks)).toFixed(0);
//   const arrayOfTruncatedValue = valueOnAxisY.slice(0, 3).split('');
//
//   return getTruncatedValue(arrayOfTruncatedValue, valueOnAxisY.length);
// };
//
// const getTruncatedValue = (arrayOfTruncatedValue: string[], valueOnAxisY: number) => {
//   switch (valueOnAxisY) {
//     case ArrayLength.Eight:
//       return `${arrayOfTruncatedValue[0]}${arrayOfTruncatedValue[1]}.${
//         arrayOfTruncatedValue[2]} M`;
//     case ArrayLength.Seven:
//       return `${arrayOfTruncatedValue[0]}.${arrayOfTruncatedValue[1]} M`;
//     case ArrayLength.Six:
//       return `0.${arrayOfTruncatedValue[0]}${arrayOfTruncatedValue[1]} M`;
//     case ArrayLength.Five:
//       return `0.0${arrayOfTruncatedValue[0]} M`;
//     case ArrayLength.Four:
//       return `0.00${arrayOfTruncatedValue[0]} M`;
//     default:
//       return arrayOfTruncatedValue;
//   }
// };
