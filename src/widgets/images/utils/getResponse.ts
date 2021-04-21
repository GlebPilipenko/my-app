import {errorMessage} from 'src/constants';
import {HitsType} from 'src/api/imagesApi/typings';
import {getImages, getImagesCountry} from 'src/api';

export const getResponse = async (
  city: string,
  country: string,
  isInvalidCity: boolean,
  invalidCountry: string,
  isInvalidCountry: boolean,
  setError: (value: string) => void,
  isInvalidMasonryViewMode: boolean,
  isInvalidCarouselViewMode: boolean,
  setPhotosInState: (response: HitsType[]) => void,
) => {
  const isInvalidValue = (
    (isInvalidMasonryViewMode && isInvalidCarouselViewMode) ||
    ((!city || isInvalidCity) && (!country || isInvalidCountry))
  );

  if (isInvalidValue) {
    return setError(errorMessage);
  }

  if (city && country && !isInvalidCountry) {
    const result = await getImages(city, country);

    if (result.data.hits.length === 0) {
      const result = await getImagesCountry(country);
      await setPhotosInState(result.data.hits);
    }

    return setPhotosInState(result.data.hits);
  }

  if (country) {
    const result = await getImagesCountry(country);
    await setPhotosInState(result.data.hits);
  }

  return setPhotosInState([]);
};

