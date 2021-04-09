import {CountryInfoType} from 'src/api/covidApi/typings';

export type PropsType = {
  maxYValue: number;
  minYValue: number;
  startCoordX: number;
  startCoordY: number;
  axisLengthY: number;
  barPlotWidth: number;
  data: [string, string | number | CountryInfoType | null][];
};
