import {FC} from 'react';
import {AxisXY} from '../axisXY';
import {PropsType} from './typings';
import style from './SVGDiagrams.module.css';
import {ErrorMessage} from 'src/common/errorMessage';
import {ColumnWithInformation} from '../columnWithInformation';

export const SVGDiagrams: FC<PropsType> = ({
  state,
  error,
}) => {

  if (!state) {
    return <ErrorMessage errorMessage={error} />;
  }

  if (state.length >= 200) {
    return <ErrorMessage errorMessage={'Country not found...'} />;
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

  const renderSVGDiagrams = () => {
    return (
      <div className={style.wrapper}>
        <div className={style.container}>
          <div className={style.graphs}>
            <svg
              width={SVG_WIDTH}
              height={SVG_HEIGHT - y0}
              className={style.svg}
            >
              <AxisXY
                x0={x0}
                y0={y0}
                dataYMax={dataYMax}
                numYTicks={numYTicks}
                dataYRange={dataYRange}
                yAxisLength={yAxisLength}
              />
              <ColumnWithInformation
                x0={x0}
                y0={y0}
                data={data}
                xAxisY={xAxisY}
                dataYMax={dataYMax}
                dataYMin={dataYMin}
                numYTicks={numYTicks}
                dataYRange={dataYRange}
                yAxisLength={yAxisLength}
                barPlotWidth={barPlotWidth}
              />
            </svg>
            <div className={style.info__container}>
              {data.map(([info, value], index) => {
                const key = `${value}${index}`;

                return (
                  <span
                    key={key}
                    className={style.info__item}
                  >
                    {info}
                  </span>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    );
  };

  return renderSVGDiagrams();
};
