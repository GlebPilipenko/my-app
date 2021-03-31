let map;
const styles = require('../json/GoogleMapStyles.json');

export const initMap = (lat: number, lng: number) => {
  // @ts-ignore
  map = new google.maps.Map(document.getElementById('map'),
    {center: {lat, lng}, zoom: 4, styles});
  // @ts-ignore
  new google.maps.Marker({position: {lat, lng}, map: map});
};
