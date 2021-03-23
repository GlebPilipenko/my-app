import {CovidAPIType} from 'src/api/covidApi/typings';

export type PropsType = {
  x0: number;
  y0: number;
  maxYValue: number;
  minYValue: number;
  axisLengthY: number;
  barPlotWidth: number;
  data: CovidAPIType[];
  countTicsYCoordinates: number;
};
