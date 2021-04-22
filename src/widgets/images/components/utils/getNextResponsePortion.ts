import {getImages} from 'src/api';
import {HitsType} from 'src/api/imagesApi/typings';
import {errorMessage, requestIsBlocked} from 'src/constants';

export const getNextResponsePortion = async (
  city: string, country: string, data: HitsType[], page: string, portion: string,
  count: number, setError: (value: string) => void, setData: (res: HitsType[]) => void
) => {
  try {
    const result = await getImages(
      city, country, false, portion, `${count + Number(page)}`
    );
    const response = result.data.hits;

    if (response.length === 0) {
      return setError(errorMessage);
    }
    setData([...data, ...response]);
  } catch (e) {
    !e.response
      ? setError(requestIsBlocked)
      : setError(e.response.data.message);
  }
};
