import {FC} from 'react';
import {PropsType} from './typings';
import {getAbbreviatedYValue} from 'src/widgets/covid/utils';

export const AxisXY: FC<PropsType> = ({
  x0,
  y0,
  maxYValue,
  axisLengthY,
  countTicsYCoordinates,
}) => (
  <>
    {Array.from({length: countTicsYCoordinates}).map((_, index) => {
      const y = y0 + index * (axisLengthY / countTicsYCoordinates);
      const abbreviatedYValue = getAbbreviatedYValue(
        index, maxYValue, countTicsYCoordinates
      );

      return (
        <g key={index}>
          <line
            y1={y}
            y2={y}
            x1={x0}
            x2={x0 - 5}
            stroke='grey'
          />
          <text
            y={y + 5}
            x={x0 - 5}
            textAnchor='end'
          >
            {abbreviatedYValue}
          </text>
        </g>
      );
    })}
  </>
);
