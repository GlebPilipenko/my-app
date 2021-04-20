import {HitsType} from 'src/api/imagesApi/typings';
import {getImages, getImagesCity, getImagesCountry} from 'src/api';

export const getResponse = async (
  city: string, country: string, setPhotos: (response: HitsType[]) => void
) => {
  if (city) {
    if (country) {
      const result = await getImages(city, country);

      if (result.data.hits.length === 0) {
        const result = await getImagesCity(city);
        await setPhotos(result.data.hits);

        if (result.data.hits.length === 0) {
          const result = await getImagesCountry(country);
          await setPhotos(result.data.hits);
        }

        return;
      }

      return setPhotos(result.data.hits);
    }

    const result = await getImagesCity(city);
    return setPhotos(result.data.hits);
  }

  if (country) {
    const result = await getImagesCountry(country);
    await setPhotos(result.data.hits);
  }
};
