import {CovidAPIType} from 'src/api/covidAPI';

export type PropsType = {
  error: string;
  state: any | CovidAPIType;
};
