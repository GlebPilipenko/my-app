import {FC} from 'react';
import {PropsType} from './typings';
import {getAbbreviatedYValue} from 'src/widgets/covid/utils';

export const AxisXY: FC<PropsType> = ({
  maxYValue,
  startCoordX,
  startCoordY,
  axisLengthY,
  countTicsYCoordinates,
}) => {
  const renderAxisXY = () => {
    return (
      <>
        {Array.from({length: countTicsYCoordinates}).map((_, index) => {
          const coordsY = startCoordY + index * (axisLengthY / countTicsYCoordinates);
          const abbreviatedYValue = getAbbreviatedYValue(index, maxYValue);

          return (
            <g key={index}>
              <line
                y1={coordsY}
                y2={coordsY}
                stroke='grey'
                x1={startCoordX}
                x2={startCoordX - 5}
              />
              <text
                textAnchor='end'
                y={coordsY + 5}
                x={startCoordX - 5}
              >
                {abbreviatedYValue}
              </text>
            </g>
          );
        })}
      </>
    );
  };

  return renderAxisXY();
};
