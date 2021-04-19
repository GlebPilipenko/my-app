const getArrayOfValues = (maxYValue: number) => {
  let array = [];
  const tenMillions = 10000000;

  for (let i = 10; i >= 1; i--) {
    array.push((maxYValue * i / tenMillions).toFixed(2));
  }

  return array;
};

export const getAbbreviatedYValue = (index: number, maxYValue: number) => (
  `${getArrayOfValues(maxYValue)[index]} M`
);
