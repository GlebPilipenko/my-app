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
        {data.map(([_, dataY], index: number) => {
            const sidePadding = 10;
            const verticalPositionForText = 15;

            const columnRatio = (dataY as number - minYValue) / maxYValue;
            const height = columnRatio * axisLengthY;
            const coordsX = startCoordX + index * barPlotWidth;
            const coordsY = startCoordY + (1 - columnRatio) * axisLengthY;

            return (
              <g key={index}>
                <g className={style.y_value__container}>
                  <text
                    textAnchor="middle"
                    y={verticalPositionForText}
                    x={coordsX + barPlotWidth / 2}
                    className={style.y__value}
                  >
                    {dataY}
                  </text>
                </g>
                <g>
                  <animateTransform
                    to="0 0"
                    dur="1s"
                    type="translate"
                    from={`0 ${height}`}
                    attributeName="transform"
                  />
                  <rect
                    height={height}
                    className={style.rect}
                    width={barPlotWidth - sidePadding}
                    y={coordsY}
                    x={coordsX + sidePadding / 2}
                  >
                    <animate
                      from="0"
                      dur="1s"
                      to={height}
                      attributeName="height"
                    />
                  </rect>
                </g>
                <text
                  textAnchor="middle"
                  x={startCoordX - 20}
                  y={startCoordY - 53}
                  className={style.quantity}
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
