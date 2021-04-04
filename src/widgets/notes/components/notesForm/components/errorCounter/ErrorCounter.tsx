import {FC} from 'react';
import {PropsType} from './typings';

export const ErrorCounter: FC<PropsType> = ({
  count,
  errorMessage,
  maxTitleLength,
  maxCityTitleLength,
  minInputValueLength,
  maxDescriptionLength,
}) => {
  const propsCount = !count ? 0 : count;

  return (
    <div>
      <span>{`${propsCount} / 100`}</span>
    </div>
  );
};
