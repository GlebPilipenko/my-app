import {FC, useEffect, useState} from 'react';
import {initMap} from './utils';
import {PropsType} from './typings';
import {ErrorMessages} from 'src/enums';
import {DefaultQueryParameters} from 'src/enums';
import {ErrorMessage} from 'src/common/errorMessage';

export const MapContainer: FC<PropsType> = ({
  coords = DefaultQueryParameters.InvalidCoords,
  style_height = DefaultQueryParameters.InvalidHeight,
}) => {
  const [error, setError] = useState<string>('');
  const invalidCoords = DefaultQueryParameters.InvalidCoords;

  const [lat, lng] = coords.split(',');
  const errorMessage = ErrorMessages.ForMap;
  const coordsNoNumber = (!isFinite(+lat) || !isFinite(+lng));
  const isInvalidCoords = ((coords === invalidCoords) || (!coords || !lat || !lng));

  const getHeightValueForMap = () => {
    if (isFinite(+style_height) && +style_height > 0) {
      return `${+style_height}px`;
    }

    return `100vh`;
  };

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

  return (
    <div
      id={'map'}
      style={{
        width: '100%',
        maxHeight: '100vh',
        height: `${getHeightValueForMap()}`
      }}
    />
  );
};
