import {CovidAPIType} from 'src/api/covidApi/typings';

export type PropsType = {
  x0: number;
  y0: number;
  xAxisY: number;
  dataYMax: number;
  dataYMin: number;
  numYTicks: number;
  dataYRange: number;
  yAxisLength: number;
  barPlotWidth: number;
  data: CovidAPIType[];
};
