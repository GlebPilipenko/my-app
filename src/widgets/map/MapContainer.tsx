import {FC, useEffect, useState} from 'react';
import {initMap} from './utils';
import {PropsType} from './typings';
import {ErrorMessages} from 'src/enums';
import {DefaultQueryParameters} from 'src/enums';
import {ErrorMessage} from 'src/common/errorMessage';

export const MapContainer: FC<PropsType> = ({
  coords = DefaultQueryParameters.InvalidCoords,
}) => {
  const [error, setError] = useState<string>('');
  const invalidCoords = DefaultQueryParameters.InvalidCoords;

  const [lat, lng] = coords.split(',');
  const errorMessage = ErrorMessages.ForMap;
  const coordsNoNumber = (!isFinite(+lat) || !isFinite(+lng));
  const isInvalidCoords = ((coords === invalidCoords) || (!coords || !lat || !lng));

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

  return <div id={'map'} style={{width: '100%', height: '100vh'}} />;
};
