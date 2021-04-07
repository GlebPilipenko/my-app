import {LocalStorageTitles} from '../enums';
import {
  getGoogleMapLoader,
  getParseLocalStorageData,
  setDataToLocalStorage
} from 'src/services';

const googleSearchBoxWidget = LocalStorageTitles.GoogleSearchBox;
const loader = getGoogleMapLoader();
loader.libraries = ['places'];

const initSearchBoxWithAutocomplete = () => (
  document.getElementById('searchTextField')
);

export const searchBoxAutocomplete = () => {
  const dataFromLocalStorage = getParseLocalStorageData(googleSearchBoxWidget);

  loader.load().then(() => {
    const searchBox = new google.maps.places.SearchBox(
      initSearchBoxWithAutocomplete() as HTMLInputElement
    );

    searchBox.addListener('places_changed', () => {
      const places = searchBox.getPlaces();

      if (places) {
        if (places.length === 0) {
          return;
        }

        setDataToLocalStorage(googleSearchBoxWidget, JSON.stringify([
          ...dataFromLocalStorage, places[0]
        ]));
      }
    });
  });
};
