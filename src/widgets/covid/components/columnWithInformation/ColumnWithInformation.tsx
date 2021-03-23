import {FC} from 'react';
import {PropsType} from './typings';
import style from '../svgDiagrams/SVGDiagrams.module.css';

export const ColumnWithInformation: FC<PropsType> = ({
  x0,
  y0,
  data,
  xAxisY,
  dataYMax,
  dataYMin,
  numYTicks,
  dataYRange,
  yAxisLength,
  barPlotWidth,
}) => {
  const renderColumnWithInformation = () => data
    .map(([info, dataY]: any, index: number) => {
        const yRatio = (dataY as number - dataYMin) / dataYRange;
        const y = y0 + (1 - yRatio) * yAxisLength;
        const x = x0 + index * barPlotWidth;
        const height = yRatio * yAxisLength;

        const sidePadding = 10;

        const yValue = (dataYMax - index * Number(
          (dataYRange / numYTicks).toFixed(0)
        ));

        return (
          <g key={index}>
            <text
              y={xAxisY - 635}
              x={x + barPlotWidth / 2}
              textAnchor='middle'
            >
              {yValue}
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
                y={y}
                height={height}
                className={style.rect}
                x={x + sidePadding / 2}
                width={barPlotWidth - sidePadding}
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
              x={x0}
              y={y0 - 35}
              textAnchor='end'
            >
              Quantity
            </text>
          </g>
        );
      }
    );

  return <>
    {renderColumnWithInformation()}
  </>;
};
