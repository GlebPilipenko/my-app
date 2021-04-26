import {maxCountSize, maxPortionSize} from 'src/widgets/images/constants';

export const getHelperConstants = (count: number, portion: string) => {
  const isShowThumbs = (
    count !== 1 &&
    (
      (+portion >= maxPortionSize) ||
      (count > (maxCountSize / maxCountSize))
    )
  );
  const isShowIndicator = (count < maxCountSize) && (+portion <= maxPortionSize / 2);

  return {isShowThumbs, isShowIndicator};
};
