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
    const xAxisLength = SVG_WIDTH - x0 * 2;

    const y0 = 150;
    const yAxisLength = SVG_HEIGHT - y0 * 2;

    const xAxisY = y0 + yAxisLength;

    const dataYMax = data.reduce(
        (currMax, [_, dataY]) => Math.max(currMax, dataY as number), 0);
    const dataYMin = data.reduce(
        (currMin, [_, dataY]) => Math.min(currMin, dataY as number), 0);
    const dataYRange = dataYMax - dataYMin;

    // Number of serifs
    const numYTicks = 7;

    // Height fo serifs
    const barPlotWidth = xAxisLength / data.length;

    return (
        <div className={style.wrapper}>
            <svg width={SVG_WIDTH} height={SVG_HEIGHT}>
                {/* X axis */}
                {/* Understand */}
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
                    const yValue = Math.floor(
                        dataYMax - index * (dataYRange / numYTicks)
                    );
                    debugger

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
                                textAnchor="end"
                            >{yValue}</text>
                        </g>
                    );
                })}
                <text
                    x={x0}
                    y={y0 - 8}
                    textAnchor="start"
                >Quantity
                </text>
                {/* Bar plots */}
                {data.map(([info, dataY], index) => {
                    const x = x0 + index * barPlotWidth;
                    const yRatio = (dataY as any - dataYMin) / dataYRange;

                    const y = y0 + (1 - yRatio) * yAxisLength;
                    const height = yRatio * yAxisLength;

                    const sidePadding = 10;

                    return (
                        <g key={index}>
                            <rect
                                x={x + sidePadding / 2}
                                y={y}
                                width={barPlotWidth - sidePadding}
                                height={height}
                            />
                            <text
                                x={x + barPlotWidth / 2}
                                y={xAxisY + 16}
                                textAnchor="middle">{info}</text>
                        </g>
                    );
                })}
            </svg>
        </div>
    );
};