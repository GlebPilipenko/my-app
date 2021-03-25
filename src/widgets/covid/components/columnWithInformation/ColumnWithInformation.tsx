import {FC} from 'react';
import {PropsType} from './typings';
import style from '../svgDiagrams/SVGDiagrams.module.css';

export const ColumnWithInformation: FC<PropsType> = ({
  data,
  maxYValue,
  minYValue,
  startCoordX,
  startCoordY,
  axisLengthY,
  barPlotWidth,
}) => {
  const renderColumnWithInformation = () => {
    return (
      <>
        {data.map(([_, dataY]: any, index: number) => {
          const columnRatio = (dataY as number - minYValue) / maxYValue;
          const coordsX = startCoordX + index * barPlotWidth;
          const coordsY = startCoordY + (1 - columnRatio) * axisLengthY;
          const verticalPositionForText = 15;
          const height = columnRatio * axisLengthY;
          const sidePadding = 10;

            return (
              <g key={index}>
                <text
                  textAnchor='middle'
                  y={verticalPositionForText}
                  x={coordsX + barPlotWidth / 2}
                >
                  {dataY}
                </text>
                <g>
                  <animateTransform
                    to='0 0'
                    dur='1s'
                    type='translate'
                    from={`0 ${height}`}
                    attributeName='transform'
                  />
                  <rect
                    height={height}
                    className={style.rect}
                    width={barPlotWidth - sidePadding}
                    y={coordsY}
                    x={coordsX + sidePadding / 2}
                  >
                    <animate
                      from='0'
                      dur='1s'
                      to={height}
                      attributeName='height'
                    />
                  </rect>
                </g>
                <text
                  textAnchor='end'
                  x={startCoordX}
                  y={startCoordY - 35}
                >
                  Quantity
                </text>
              </g>
            );
          }
        )}
      </>
    );
  };

  return renderColumnWithInformation();
};
