import {HitsType} from 'src/api/imagesApi/typings';

export type PropsType = {
  data: HitsType[];
  numberOfColumns: string;
  showNextResponsePortion: () => Promise<void>;
};
