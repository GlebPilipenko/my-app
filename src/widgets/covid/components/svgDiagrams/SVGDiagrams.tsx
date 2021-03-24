import {FC} from 'react';
import {AxisXY} from '../axisXY';
import {PropsType} from './typings';
import style from './SVGDiagrams.module.css';
import {getCapitalizedString} from 'src/utils';
import {ColumnWithInformation} from '../columnWithInformation';

export const SVGDiagrams: FC<PropsType> = ({state}) => {
  const [, , , cases, , deaths, , recovered, , active] = state;
  const data = [cases, deaths, recovered, active];

  const SVG_WIDTH = 1000;
  const SVG_HEIGHT = 700;

  const x0 = 65;
  const y0 = 50;
  const countTicsYCoordinates = 7;
  const axisLengthX = SVG_WIDTH - x0 * 2;
  const axisLengthY = SVG_HEIGHT - y0 * 2;

  const maxYValue = data.reduce(
    (currMax, [_, dataY]) => Math.max(currMax, dataY as number), 0);
  const minYValue = data.reduce(
    (currMin, [_, dataY]) => Math.min(currMin, dataY as number), 0);

  const barPlotWidth = axisLengthX / data.length;

  const renderColumnNames = () => {
    return (
      <div className={style.info__container}>
        {data.map(([info, value]) => {
            const key = `${value}${Date.now()}`;

            return (
              <span
                key={key}
                className={style.info__item}
              >
                {getCapitalizedString(info)}
              </span>
            );
          }
        )}
      </div>
    );
  };
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
                maxYValue={maxYValue}
                axisLengthY={axisLengthY}
                countTicsYCoordinates={countTicsYCoordinates}
              />
              <ColumnWithInformation
                x0={x0}
                y0={y0}
                data={data}
                maxYValue={maxYValue}
                minYValue={minYValue}
                axisLengthY={axisLengthY}
                barPlotWidth={barPlotWidth}
                countTicsYCoordinates={countTicsYCoordinates}
              />
            </svg>
            {renderColumnNames()}
          </div>
        </div>
      </div>
    );
  };

  return renderSVGDiagrams();
};
