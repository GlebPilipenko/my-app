export const getAbbreviatedYValue = (
  index: number, dataYMax: number, dataYRange: number, numYTicks: number
) => {
  const yValue = (
    dataYMax - index * (dataYRange / numYTicks)
  ).toFixed(0);
  const trimmedValueTwo = yValue.slice(0, 2).split('');
  const trimmedValueThree = yValue.slice(0, 3).split('');

  if (yValue.length === 8) {
    return `${trimmedValueThree[0]}${
      trimmedValueThree[1]}.${trimmedValueThree[2]
    } M`;
  }

  if (yValue.length === 7) {
    return `${trimmedValueTwo[0]}.${trimmedValueTwo[1]} M`;
  }

  if (yValue.length === 6) {
    return `0.${trimmedValueTwo[0]} M`;
  }

  if (yValue.length === 5) {
    return `0.0${trimmedValueTwo[0]} M`;
  }

  if (yValue.length === 4) {
    return `0.00${trimmedValueTwo[0]} M`;
  }

  return yValue;
};
