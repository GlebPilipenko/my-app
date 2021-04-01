const styles = require('../json/GoogleMapStyles.json');
let map;

export const initMap = (lat: number, lng: number) => {
  // @ts-ignore
  map = new google.maps.Map(document.getElementById('map') as HTMLElement,
    {center: {lat, lng}, zoom: 4, styles});
  // @ts-ignore
  new google.maps.Marker({position: {lat, lng}, map: map});
};
