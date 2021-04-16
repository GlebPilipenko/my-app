import {FC, useEffect, useState} from 'react';
import {initMap} from './utils';
import {PropsType} from './typings';
import style from './MapContainer.module.css'
import {ErrorMessage} from 'src/common/errorMessage';
import {ErrorMessages, DefaultQueryParameters} from 'src/enums';

export const MapContainer: FC<PropsType> = ({
  coords = DefaultQueryParameters.InvalidCoords,
  styles = DefaultQueryParameters.InvalidHeight,
}) => {
  const [error, setError] = useState<string>('');

  const invalidCoords = DefaultQueryParameters.InvalidCoords;

  const [lat, lng] = coords.split(',');
  const errorMessage = ErrorMessages.ForMap;
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
    className={style.map}
    style={JSON.parse(styles)}
  />;
};
