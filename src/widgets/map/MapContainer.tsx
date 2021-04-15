import {FC, useEffect, useState} from 'react';
import {initMap} from './utils';
import {PropsType} from './typings';
import {ErrorMessages} from 'src/enums';
import {DefaultQueryParameters} from 'src/enums';
import {ErrorMessage} from 'src/common/errorMessage';
import {
  unitVw,
  unitVh,
  unitPx,
  unitRem,
  unitPercent,
  defaultWidth,
  defaultHeight,
} from './constants';

export const MapContainer: FC<PropsType> = ({
  coords = DefaultQueryParameters.InvalidCoords,
  styles = DefaultQueryParameters.InvalidHeight,
}) => {
  const [error, setError] = useState<string>('');

  const invalidCoords = DefaultQueryParameters.InvalidCoords;
  const value = unitPx || unitVh || unitVw || unitRem || unitPercent;

  const defaultStyles = {
    width: defaultWidth,
    height: defaultHeight
  };
  const [lat, lng] = coords.split(',');
  const errorMessage = ErrorMessages.ForMap;
  const coordsNoNumber = (!isFinite(+lat) || !isFinite(+lng));
  const isInvalidCoords = (
    (coords === invalidCoords) || (!coords || !lat || !lng)
  );
  const getValidStyle = () => {
    const propsStyles = JSON.parse(styles);
    const arrayOfKeys = Object.values(propsStyles);

    const arrayOfBoolean = arrayOfKeys.map((el: any) => isFinite(el));
    const isValueFalse = arrayOfBoolean.some(bool => !bool);
    const substrInStr = arrayOfKeys
      .map((el: any) => el.indexOf(value)).some((el: number) => el !== -1);

    if (isValueFalse && substrInStr) {
      return propsStyles;
    }

    return defaultStyles;
  }

  useEffect(() => {
    if (isInvalidCoords) {
      return setError(errorMessage);
    }

    if (coords && !coordsNoNumber) {
      const maxZenithPoint = 85;
      const angleFromZenithToEquator = (
        (+lat < maxZenithPoint) && (+lat > -maxZenithPoint)
      );

      if (!angleFromZenithToEquator) {
        return setError(errorMessage);
      }

      return initMap(+lat, +lng);
    }

    setError(errorMessage);
  }, [lat, lng, errorMessage, isInvalidCoords, coordsNoNumber, coords]);

  if (error) {
    return <ErrorMessage errorMessage={error} />;
  }

  return <div id={'map'} style={getValidStyle()} />;
};
