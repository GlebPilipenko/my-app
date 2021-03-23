import {CovidAPIType} from 'src/api/covidApi/typings';

export type PropsType = {
  error: string;
  state: any | CovidAPIType;
};
