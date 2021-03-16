import React from 'react';
import style from './Holst.module.css';
import {CovidAPIType} from '../../../../api/covidAPI';

type PropsType = {
    state: any | CovidAPIType;
}

export const Diagrams: React.FC<PropsType> = ({state}) => {

    if (!state) {
        return null;
    }

    const [, , , cases, , deaths, , recovered, , active] = state;
    const data = [
        cases,
        deaths,
        recovered,
        active,
    ];

    const SVG_WIDTH = 1000;
    const SVG_HEIGHT = 700;

    const x0 = 150;
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

    const getAbbreviatedYValue = (index: number) => {
        const yValue = (
            dataYMax - index * (dataYRange / numYTicks)
        ).toFixed(0);
        const trimmedValueTwo = yValue.slice(0, 2).split('');
        const trimmedValueThree = yValue.slice(0, 3).split('');

        if (yValue.length === 8) {
            return `${trimmedValueThree[0]}${
                trimmedValueThree[1]}.${trimmedValueThree[2]
            } M`;
        }

        if (yValue.length === 7) {
            return `${trimmedValueTwo[0]}.${trimmedValueTwo[1]} M`;
        }

        if (yValue.length === 6) {
            return `0.${trimmedValueTwo[0]} M`;
        }

        if (yValue.length === 5) {
            return `0.0${trimmedValueTwo[0]} M`;
        }

        if (yValue.length === 4) {
            return `0.00${trimmedValueTwo[0]} M`;
        }

        return yValue;
    };

    return (
        <div className={style.wrapper}>
            <svg width={SVG_WIDTH} height={SVG_HEIGHT}>

                {/* X axis */}
                <line
                    x1={x0}
                    y1={xAxisY}
                    x2={x0 + xAxisLength}
                    y2={xAxisY}
                    stroke="red"
                />
                <text
                    x={x0 + xAxisLength + 5}
                    y={xAxisY + 4}
                >Column names
                </text>
                {/* Y axis */}
                <line
                    x1={x0}
                    y1={y0}
                    x2={x0}
                    y2={y0 + yAxisLength}
                    stroke="red"
                />

                {Array.from({length: numYTicks}).map((_, index) => {
                    const y = y0 + index * (yAxisLength / numYTicks);
                    const abbreviatedYValue = getAbbreviatedYValue(index);

                    return (
                        <g key={index}>
                            <line
                                x1={x0}
                                y1={y}
                                x2={x0 - 5}
                                y2={y}
                                stroke="grey"
                            />
                            <text
                                x={x0 - 5}
                                y={y + 5}
                                textAnchor="end">
                                {abbreviatedYValue}
                            </text>
                        </g>
                    );
                })}

                <text
                    x={x0}
                    y={y0 - 35}
                    textAnchor="end"
                >Quantity
                </text>

                {/* Bar plots */}
                {data.map(([info, dataY], index) => {
                    const x = x0 + index * barPlotWidth;
                    const yRatio = (dataY as any - dataYMin) / dataYRange;
                    const y = y0 + (1 - yRatio) * yAxisLength;
                    const height = yRatio * yAxisLength;

                    const sidePadding = 10;

                    const yValue = (dataYMax - index * Number(
                        (dataYRange / numYTicks).toFixed(0)
                    ));

                    return (
                        <g key={index}>
                            <text
                                x={x + barPlotWidth / 2}
                                y={xAxisY - 635}
                                textAnchor="middle">
                                {yValue}
                            </text>
                            <rect
                                x={x + sidePadding / 2}
                                y={y}
                                width={barPlotWidth - sidePadding}
                                className={style.rect}
                                height={height}
                            />
                            <text
                                x={x + barPlotWidth / 2}
                                y={xAxisY + 16}
                                textAnchor="middle">
                                {info}
                            </text>
                        </g>
                    );
                })}

            </svg>
        </div>
    );
};
