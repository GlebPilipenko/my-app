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

  const startCoordX = 65;
  const startCoordY = 50;
  const countTicsYCoordinates = 7;
  const axisLengthX = SVG_WIDTH - startCoordX * 2;
  const axisLengthY = SVG_HEIGHT - startCoordY * 2;

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
              height={SVG_HEIGHT - startCoordY}
              className={style.svg}
            >
              <AxisXY
                maxYValue={maxYValue}
                startCoordX={startCoordX}
                startCoordY={startCoordY}
                axisLengthY={axisLengthY}
                countTicsYCoordinates={countTicsYCoordinates}
              />
              <ColumnWithInformation
                data={data}
                maxYValue={maxYValue}
                minYValue={minYValue}
                startCoordX={startCoordX}
                startCoordY={startCoordY}
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
