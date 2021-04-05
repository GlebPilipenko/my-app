const getArrayOfValues = (maxYValue: number) => {
  let array = [];

  for (let i = 10; i >= 1; i--) {
    array.push((maxYValue * i / 10000000).toFixed(2));
  }

  return array;
};

export const getAbbreviatedYValue = (index: number, maxYValue: number) => (
  `${getArrayOfValues(maxYValue)[index]} M`
);
