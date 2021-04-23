import {HitsType} from 'src/api/imagesApi/typings';

export type PropsType = {
  count: number;
  portion: string;
  data: HitsType[];
  showNextResponsePortion: () => Promise<void>;
};
