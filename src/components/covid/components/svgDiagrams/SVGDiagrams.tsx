import React from 'react';
import {PropsType} from './typings';
import style from './SVGDiagrams.module.css';
import {getAbbreviatedYValue} from 'src/components/covid/utils';
import {ErrorMessage} from 'src/components/common/errorMessage';

export const SVGDiagrams: React.FC<PropsType> = ({
  state,
  error,
}) => {

  if (!state) {
    return <ErrorMessage errorMessage={error} />;
  }

  const [, , , cases, , deaths, , recovered, , active] = state;
  const data = [cases, deaths, recovered, active];

  const SVG_WIDTH = 1000;
  const SVG_HEIGHT = 700;

  const x0 = 65;
  const y0 = 50;
  const numYTicks = 7;
  const xAxisLength = SVG_WIDTH - x0 * 2;
  const yAxisLength = SVG_HEIGHT - y0 * 2;
  const xAxisY = y0 + yAxisLength;

  const dataYMax = data.reduce(
    (currMax, [_, dataY]) => Math.max(currMax, dataY as number), 0);
  const dataYMin = data.reduce(
    (currMin, [_, dataY]) => Math.min(currMin, dataY as number), 0);

  const dataYRange = dataYMax - dataYMin;
  const barPlotWidth = xAxisLength / data.length;

  const renderAxisX_Y = () => {
    return (
      <React.Fragment>
        {
          Array.from({length: numYTicks}).map((_, index) => {
            const y = y0 + index * (yAxisLength / numYTicks);
            const abbreviatedYValue = getAbbreviatedYValue(
              index, dataYMax, dataYRange, numYTicks
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
          })
        }
      </ React.Fragment>
    );
  };
  const renderYValue_Rect = () => data.map(([info, dataY], index) => {
      const x = x0 + index * barPlotWidth;
      const yRatio = (dataY as number - dataYMin) / dataYRange;
      const y = y0 + (1 - yRatio) * yAxisLength;
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
  const renderSVGDiagrams = () => {
    return (
      <div className={style.wrapper}>
        <div className={style.container}>
          <svg width={SVG_WIDTH} height={SVG_HEIGHT - y0}>
            {renderAxisX_Y()}
            {renderYValue_Rect()}
          </svg>
          <div className={style.info__container}>
            {
              data.map(([info, value], index) => {
                return (
                  <span
                    key={value + index}
                    className={style.info__item}
                  >
                    {info}
                  </span>
                );
              })
            }
          </div>
        </div>
      </div>
    );
  };

  if (state.length >= 200) {
    return <ErrorMessage errorMessage={'Country not found...'} />;
  }

  return renderSVGDiagrams();
};
