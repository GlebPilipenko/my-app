const styles = require('../json/GoogleMapStyles.json');
let map;

export const initMap = (lat: number, lng: number) => {
  map = new google.maps.Map(document.getElementById('map') as HTMLElement,
    {center: {lat, lng}, zoom: 4, styles});
  new google.maps.Marker({position: {lat, lng}, map: map});
};
