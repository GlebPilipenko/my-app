import {FC, useEffect, useState} from 'react';
import {initMap} from './utils';
import {PropsType} from './typings';
import style from './MapContainer.module.css';
import {ErrorMessage} from 'src/common/errorMessage';
import {ErrorMessages, DefaultQueryParameters} from 'src/enums';

export const MapContainer: FC<PropsType> = ({
  styles,
  coords = DefaultQueryParameters.InvalidCoords,
}) => {
  const [error, setError] = useState<string>('');

  const defaultStyles = {
    'width': '50vw',
    'height': '50vh'
  };
  const [lat, lng] = coords.split(',');
  const errorMessage = ErrorMessages.ForMap;
  const invalidCoords = DefaultQueryParameters.InvalidCoords;
  const coordsNoNumber = (!isFinite(+lat) || !isFinite(+lng));
  const isInvalidCoords = (
    (coords === invalidCoords) || (!coords || !lat || !lng)
  );

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

  return <div
    id={'map'}
    style={styles
      ? JSON.parse(styles)
      : defaultStyles
    }
    className={style.map}
  />;
};
