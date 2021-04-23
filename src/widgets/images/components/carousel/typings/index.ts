import {HitsType} from 'src/api/imagesApi/typings';

export type PropsType = {
  count: number;
  data: HitsType[];
  showNextResponsePortion: () => Promise<void>;
};
