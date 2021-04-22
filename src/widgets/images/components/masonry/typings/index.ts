import {HitsType} from 'src/api/imagesApi/typings';

export type PropsType = {
  city: string;
  page: string;
  country: string;
  portion: string;
  data: HitsType[];
  numberOfColumns: string;
  setError: (value: string) => void;
  setData: (state: HitsType[]) => void;
};
