import {CovidAPIType} from 'src/api/covidApi/typings';

export type PropsType = {
  maxYValue: number;
  minYValue: number;
  startCoordX: number;
  startCoordY: number;
  axisLengthY: number;
  barPlotWidth: number;
  data: CovidAPIType[];
  countTicsYCoordinates: number;
};
