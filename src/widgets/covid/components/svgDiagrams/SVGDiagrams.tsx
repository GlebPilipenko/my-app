import {FC} from 'react';
import {AxisXY} from '../axisXY';
import {PropsType} from './typings';
import style from './SVGDiagrams.module.css';
import {getCapitalizedString} from 'src/utils';
import {ColumnWithInformation} from '../columnWithInformation';

export const SVGDiagrams: FC<PropsType> = ({
  state,
}) => {
  const data = Object.entries(state);

  const axisX = 0;
  const axisY = 0;

  const SVG_WIDTH = 1000;
  const SVG_HEIGHT = 700;

  const startCoordX = 65;
  const startCoordY = 70;
  const countTicsYCoordinates = 10;
  const axisLengthX = SVG_WIDTH - startCoordX * 2;
  const axisLengthY = SVG_HEIGHT - startCoordY * 2;

  const minYValue = 0;
  const maxYValue = data.reduce(
    (currMax, [_, dataY]) => Math.max(currMax, dataY as number), 0);

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
              className={style.svg}
              viewBox={`
                ${axisX} 
                ${axisY} 
                ${SVG_WIDTH} 
                ${SVG_HEIGHT - startCoordY}
                `}
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
