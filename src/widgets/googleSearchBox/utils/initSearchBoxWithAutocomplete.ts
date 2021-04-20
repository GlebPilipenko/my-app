import {LocalStorageTitles} from '../enums';
import {getGoogleMapLoader, setDataToLocalStorage} from 'src/services';

const googleSearchBoxWidget = LocalStorageTitles.GoogleSearchBox;

const initSearchBoxWithAutocomplete = () => (
  document.getElementById('searchTextField')
);
export const searchBoxAutocomplete = () => {
  const loader = getGoogleMapLoader();

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

        setDataToLocalStorage(googleSearchBoxWidget, JSON.stringify([places[0]]));
      }
    });
  });
};
