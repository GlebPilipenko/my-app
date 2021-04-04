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
  return (
    <div>
      <span>{`${count} / 100`}</span>
    </div>
  );
};
