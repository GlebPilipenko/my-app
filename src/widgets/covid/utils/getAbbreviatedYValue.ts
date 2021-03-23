export const getAbbreviatedYValue = (
  index: number, maxYValue: number, numYTicks: number
) => {
  const yValue = (maxYValue - index * (maxYValue / numYTicks)).toFixed(0);
  const arrayOfValue = yValue.slice(0, 3).split('');

  return getTruncatedValue(arrayOfValue, yValue.length);
};

const getTruncatedValue = (truncatedValue: string[], arrayLength: number) => {
  if (arrayLength === 8) {
    return `${truncatedValue[0]}${truncatedValue[1]}.${truncatedValue[2]} M`;
  }

  if (arrayLength === 7) {
    return `${truncatedValue[0]}.${truncatedValue[1]} M`;
  }

  if (arrayLength === 6) {
    return `0.${truncatedValue[0]} M`;
  }

  if (arrayLength === 5) {
    return `0.0${truncatedValue[0]} M`;
  }

  if (arrayLength === 4) {
    return `0.00${truncatedValue[0]} M`;
  }

  return truncatedValue;
}
